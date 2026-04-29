import { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { useLanguage } from '../i18n/LanguageContext';
import { speechSettings } from '../speech/speechScripts';
import type { AppLanguage } from '../i18n/types';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';

function LangChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      <AppText style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{label}</AppText>
    </Pressable>
  );
}

export function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();
  const speechText = useMemo(() => speechSettings(t), [t]);

  const setLang = (lang: AppLanguage) => () => setLanguage(lang);

  return (
    <View style={styles.root}>
      <Screen scroll contentStyle={styles.scroll}>
      <AppText variant="title" style={styles.h1}>
        {t.settings.title}
      </AppText>
      <AppText variant="caption" style={styles.sub}>
        {t.settings.sub}
      </AppText>
      <AppText variant="caption" style={styles.speechHelp}>
        {t.settings.speechHelp}
      </AppText>

      <Card style={styles.card}>
        <AppText variant="subtitle" style={styles.blockTitle}>
          {t.settings.language}
        </AppText>
        <AppText variant="caption" style={styles.hint}>
          {t.settings.languageHint}
        </AppText>
        <View style={styles.chipRow}>
          <LangChip
            label={t.settings.english}
            selected={language === 'en'}
            onPress={setLang('en')}
          />
          <LangChip
            label={t.settings.acholi}
            selected={language === 'ach'}
            onPress={setLang('ach')}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <AppText variant="subtitle">{t.settings.offlineTitle}</AppText>
            <AppText variant="caption">{t.settings.offlineHint}</AppText>
          </View>
          <View style={styles.pill}>
            <Ionicons name="cloud-offline" size={20} color={colors.primaryDark} />
            <AppText style={styles.pillText}>{t.settings.offlineOn}</AppText>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <AppText variant="subtitle" style={styles.blockTitle}>
          {t.settings.modelTitle}
        </AppText>
        <AppText variant="body">{t.settings.modelBody}</AppText>
      </Card>

      <Card style={styles.card}>
        <AppText variant="subtitle" style={styles.blockTitle}>
          {t.settings.aboutTitle}
        </AppText>
        <AppText variant="body">{t.settings.aboutBody}</AppText>
      </Card>
      </Screen>
      <ReadAloudButton text={speechText} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 96 },
  h1: { marginBottom: spacing.xs },
  sub: { marginBottom: spacing.sm },
  speechHelp: { marginBottom: spacing.lg, color: colors.primaryDark, fontWeight: '600' },
  card: { marginBottom: spacing.md },
  blockTitle: { marginBottom: spacing.sm },
  hint: { marginBottom: spacing.md },
  chipRow: { flexDirection: 'row', gap: spacing.sm },
  chip: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.accent,
  },
  chipPressed: { opacity: 0.88 },
  chipLabel: { fontSize: 16, fontWeight: '700', color: colors.textSecondary },
  chipLabelSelected: { color: colors.primaryDark },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  rowText: { flex: 1 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  pillText: { fontWeight: '800', color: colors.primaryDark },
});
