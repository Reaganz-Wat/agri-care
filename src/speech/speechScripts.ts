import { Platform } from 'react-native';
import type { Strings } from '../i18n/strings';
import type { DiseaseCopy } from '../data/diseases';

function joinParts(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join('\n\n');
}

export function speechHome(t: Strings): string {
  return joinParts([
    'AGRICARE.',
    t.home.heroSub,
    t.home.overviewSectionLabel,
    t.home.overviewIntro,
    t.home.overviewBullet1,
    t.home.overviewBullet2,
    t.home.overviewBullet3,
  ]);
}

export function speechDiagnoseHome(t: Strings): string {
  return joinParts([
    t.diagnose.tipPhoto,
    t.home.cameraBlockTitle,
    t.home.useCamera,
    t.home.orDivider,
    t.home.galleryBlockTitle,
    t.home.chooseGallery,
    t.diagnose.howItWorks,
    `1. ${t.diagnose.step1}`,
    `2. ${t.diagnose.step2}`,
    `3. ${t.diagnose.step3}`,
    t.diagnose.illusCaption,
  ]);
}

export function speechCapture(t: Strings): string {
  return joinParts([
    t.diagnose.captureHeading,
    t.diagnose.captureLead,
    t.diagnose.captureChooseMethod,
    t.home.cameraBlockTitle,
    t.home.useCamera,
    t.home.orDivider,
    t.home.galleryBlockTitle,
    t.home.chooseGallery,
    Platform.OS === 'web' ? t.diagnose.webCameraHint : t.diagnose.nativeCameraHint,
    t.diagnose.captureNote,
  ]);
}

export function speechProcessing(t: Strings): string {
  return joinParts([t.diagnose.processingTitle, t.diagnose.processingSub, t.diagnose.processingOverlay]);
}

export function speechResult(
  t: Strings,
  diseaseTitle: string,
  copy: DiseaseCopy | null,
  pct: number,
): string {
  const parts: string[] = [
    t.diagnose.resultMaizeDiseaseLabel,
    diseaseTitle,
    copy?.shortDescription ?? '',
    t.diagnose.resultFromAnalysis,
    `${t.diagnose.resultLikely}. ${t.diagnose.resultConfidence}: ${pct}.`,
    t.diagnose.resultDemoNote,
    t.diagnose.resultAdvisoryLead,
  ];
  if (copy) {
    parts.push(`${t.advice.symptoms}. ${copy.symptoms.join(' ')}`);
    parts.push(`${t.advice.management}. ${copy.management.join(' ')}`);
    parts.push(`${t.advice.prevention}. ${copy.prevention.join(' ')}`);
  }
  parts.push(t.advice.disclaimer);
  return joinParts(parts);
}

export function speechSettings(t: Strings): string {
  return joinParts([
    t.settings.title,
    t.settings.sub,
    t.settings.speechHelp,
    `${t.settings.language}. ${t.settings.languageHint}`,
    `${t.settings.english}. ${t.settings.acholi}.`,
    t.settings.offlineTitle,
    t.settings.offlineHint,
    t.settings.modelTitle,
    t.settings.modelBody,
    t.settings.aboutTitle,
    t.settings.aboutBody,
  ]);
}
