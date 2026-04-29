/**
 * @remarks For native iOS/Android, Metro bundles `runDiagnosis.native.ts` instead
 * of this file. The web build uses `runDiagnosis.web.ts`. This re-export is for
 * TypeScript and default resolution.
 */
export type { DiagnosisResult } from './types';
export { runDiagnosis } from './runDiagnosis.web';
