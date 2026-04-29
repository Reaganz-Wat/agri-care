import type { DiseaseId } from '../data/diseases';

export type DiagnosisResult = {
  diseaseId: DiseaseId;
  /** Model confidence 0–1 (probability of the predicted class after softmax). */
  confidence: number;
};
