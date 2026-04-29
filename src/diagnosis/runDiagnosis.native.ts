import type { DiagnosisResult } from './types';
export async function runDiagnosis(_imageUri: string): Promise<DiagnosisResult> {
  // AI/model integration removed. Keep UI flow working with a deterministic placeholder.
  return { diseaseId: 'healthy', confidence: 0.5 };
}
