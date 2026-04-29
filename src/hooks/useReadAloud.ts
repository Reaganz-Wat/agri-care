import { useState, useEffect, useCallback } from 'react';
import * as Speech from 'expo-speech';

export function useReadAloud() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string, locale: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    Speech.stop();
    setSpeaking(true);
    Speech.speak(trimmed, {
      language: locale,
      pitch: 1,
      rate: 0.92,
      onDone: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  }, []);

  const toggle = useCallback(
    (text: string, locale: string) => {
      if (speaking) {
        stop();
      } else {
        speak(text, locale);
      }
    },
    [speaking, speak, stop],
  );

  return { speaking, speak, stop, toggle };
}
