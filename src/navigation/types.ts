import type { NavigatorScreenParams } from '@react-navigation/native';
import type { DiseaseId } from '../data/diseases';

export type DiagnoseStackParamList = {
  DiagnoseHome: undefined;
  /** User always chooses camera vs gallery on this screen (no auto-launch). */
  Capture: undefined;
  Processing: { imageUri: string };
  Result: {
    imageUri: string;
    diseaseId: DiseaseId;
    confidence: number;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Diagnose: NavigatorScreenParams<DiagnoseStackParamList> | undefined;
  Settings: undefined;
};
