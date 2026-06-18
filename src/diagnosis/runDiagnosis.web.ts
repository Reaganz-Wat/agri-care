import type { DiagnosisResult } from './types';

export async function runDiagnosis(_imageUri: string): Promise<DiagnosisResult> {
  throw new Error(
    'On-device diagnosis requires the Android or iOS app. The web preview cannot run the TFLite model.',
  );
}
