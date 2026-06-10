import { loadTensorflowModel } from 'react-native-fast-tflite';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import jpeg from 'jpeg-js';
import type { DiagnosisResult } from './types';
import type { DiseaseId } from '../data/diseases';

const MODEL_INPUT_SIZE = 224;

// Order matches class_labels.txt: Common Rust, Gray Leaf Spot, Healthy, Northern Leaf Blight, Not Maize Leaf
const CLASS_TO_DISEASE: DiseaseId[] = [
  'common_rust',
  'gray_leaf_spot',
  'healthy',
  'maize_leaf_blight',
  'not_maize_leaf',
];

type TFModel = Awaited<ReturnType<typeof loadTensorflowModel>>;
let _model: TFModel | null = null;

async function getModel(): Promise<TFModel> {
  if (!_model) {
    // expo-asset copies the bundled .tflite to the local filesystem so we get
    // a proper file:// URI — Image.resolveAssetSource() returns a bare asset
    // name on Android that java.net.URL rejects as having no protocol.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const [asset] = await Asset.loadAsync(require('../../assets/scratch_cnn.tflite'));
    if (!asset.localUri) throw new Error('Could not resolve model asset to local URI');
    _model = await loadTensorflowModel({ url: asset.localUri }, []);
  }
  return _model;
}

function softmax(arr: Float32Array): Float32Array {
  const max = Math.max(...arr);
  const exps = Array.from(arr).map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return new Float32Array(exps.map((v) => v / sum));
}

export async function runDiagnosis(imageUri: string): Promise<DiagnosisResult> {
  const model = await getModel();

  // Resize the image to the model's expected input dimensions
  const { base64 } = await manipulateAsync(
    imageUri,
    [{ resize: { width: MODEL_INPUT_SIZE, height: MODEL_INPUT_SIZE } }],
    { format: SaveFormat.JPEG, base64: true },
  );

  if (!base64) throw new Error('Image processing failed: no pixel data returned');

  // Decode base64 string → raw bytes → JPEG RGBA pixels
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

  const { data: rgba } = jpeg.decode(bytes.buffer, { useTArray: true });

  // Build flat Float32Array [R,G,B, R,G,B, ...] in raw [0, 255] range.
  // The MobileNetV3Large model has a built-in Rescaling layer (include_preprocessing=True)
  // that handles normalisation internally — do NOT divide by 255 here.
  const pixels = new Float32Array(MODEL_INPUT_SIZE * MODEL_INPUT_SIZE * 3);
  for (let i = 0; i < MODEL_INPUT_SIZE * MODEL_INPUT_SIZE; i++) {
    pixels[i * 3]     = rgba[i * 4];
    pixels[i * 3 + 1] = rgba[i * 4 + 1];
    pixels[i * 3 + 2] = rgba[i * 4 + 2];
  }

  // run() accepts ArrayBuffer[]; use pixels.buffer to get the underlying ArrayBuffer
  const outputs = await model.run([pixels.buffer]);
  const rawScores = new Float32Array(outputs[0]);

  // Apply softmax if the model outputs raw logits (scores that don't sum to ~1)
  const scoreSum = Array.from(rawScores).reduce((a, b) => a + b, 0);
  const probs = Math.abs(scoreSum - 1.0) < 0.1 ? rawScores : softmax(rawScores);

  let topIdx = 0;
  for (let i = 1; i < probs.length; i++) {
    if (probs[i] > probs[topIdx]) topIdx = i;
  }

  return {
    diseaseId: CLASS_TO_DISEASE[topIdx] ?? 'not_maize_leaf',
    confidence: probs[topIdx],
  };
}
