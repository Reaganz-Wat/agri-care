import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../i18n/LanguageContext';
import { getSpeechLocale } from '../i18n/speechLocale';
import { useReadAloud } from '../hooks/useReadAloud';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';

type Props = {
  /** Plain text for the device text-to-speech engine (matches selected app language). */
  text: string;
};

/**
 * Floating “Listen” control: reads screen content aloud. Uses the system voice for English or Acholi (when available).
 */
export function ReadAloudButton({ text }: Props) {
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguage();
  const locale = getSpeechLocale(language);
  const { speaking, toggle } = useReadAloud();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t.readAloud.a11y}
      onPress={() => toggle(text, locale)}
      style={({ pressed }) => [
        styles.fab,
        { bottom: spacing.md + insets.bottom, left: spacing.md },
        speaking && styles.fabActive,
        pressed && styles.fabPressed,
      ]}
    >
      <View style={styles.fabInner}>
        <Ionicons name={speaking ? 'stop' : 'mic'} size={22} color="#fff" />
        <Text style={styles.fabLabel}>{speaking ? t.readAloud.stop : t.readAloud.listen}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderRadius: radius.full,
    backgroundColor: colors.primaryDark,
  },
  fabActive: {
    backgroundColor: colors.error,
  },
  fabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  fabPressed: { opacity: 0.9 },
  fabLabel: { color: '#fff', fontWeight: '800', fontSize: 15, marginLeft: spacing.sm },
});
