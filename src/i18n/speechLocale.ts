import type { AppLanguage } from './types';

/**
 * BCP-47 tags for expo-speech. Acholi may fall back to English voice on some devices.
 */
export function getSpeechLocale(lang: AppLanguage): string {
  return lang === 'ach' ? 'ach-UG' : 'en-US';
}
