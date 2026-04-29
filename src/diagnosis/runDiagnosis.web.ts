import type { DiagnosisResult } from './types';

export async function runDiagnosis(_imageUri: string): Promise<DiagnosisResult> {
  // AI/model integration removed. Keep web preview usable with a placeholder.
  return { diseaseId: 'healthy', confidence: 0.5 };
}
