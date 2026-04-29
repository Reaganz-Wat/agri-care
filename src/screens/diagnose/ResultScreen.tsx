import { useLayoutEffect, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MaizeCropIcon } from '../../components/MaizeCropIcon';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OutlineButton } from '../../components/OutlineButton';
import { ReadAloudButton } from '../../components/ReadAloudButton';
import { useLanguage } from '../../i18n/LanguageContext';
import { speechResult } from '../../speech/speechScripts';
import type { DiagnoseStackParamList } from '../../navigation/types';
import { getDiseaseById, getDiseaseCopy } from '../../data/diseases';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

type Props = NativeStackScreenProps<DiagnoseStackParamList, 'Result'>;

function BulletList({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <View key={line} style={styles.bulletRow}>
          <AppText style={styles.bullet}>•</AppText>
          <AppText variant="body" style={styles.bulletText}>
            {line}
          </AppText>
        </View>
      ))}
    </>
  );
}

export function ResultScreen({ route, navigation: stackNavigation }: Props) {
  const { imageUri, diseaseId, confidence } = route.params;
  const { t, language } = useLanguage();
  const record = getDiseaseById(diseaseId);
  const copy = record ? getDiseaseCopy(record, language) : null;
  const diseaseTitle = copy?.name ?? diseaseId;

  useLayoutEffect(() => {
    stackNavigation.setOptions({
      title: diseaseTitle,
    });
  }, [stackNavigation, diseaseTitle]);

  const pct = Math.round(confidence * 100);
  const speechText = useMemo(
    () => speechResult(t, diseaseTitle, copy, pct),
    [t, diseaseTitle, copy, pct],
  );

  return (
    <View style={styles.root}>
      <Screen scroll contentStyle={styles.scroll}>
      <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />

      <View style={styles.diseaseBanner}>
        <View style={styles.bannerTop}>
          <View style={styles.bannerIconWrap}>
            <MaizeCropIcon size={44} noShadow />
          </View>
          <View style={styles.bannerTextCol}>
            <AppText style={styles.bannerKicker}>{t.diagnose.resultMaizeDiseaseLabel}</AppText>
            <AppText style={styles.bannerDiseaseName} numberOfLines={4}>
              {diseaseTitle}
            </AppText>
            {copy ? (
              <AppText style={styles.bannerSubtitle} numberOfLines={3}>
                {copy.shortDescription}
              </AppText>
            ) : null}
            <AppText style={styles.bannerMeta}>{t.diagnose.resultFromAnalysis}</AppText>
          </View>
        </View>

        <View style={styles.bannerDivider} />

        <View style={styles.confidenceBlock}>
          <View style={styles.badgeRow}>
            <Ionicons name="analytics" size={18} color="rgba(255,255,255,0.95)" />
            <AppText style={styles.confidenceLabel}>{t.diagnose.resultLikely}</AppText>
          </View>
          <View style={styles.meter}>
            <View style={[styles.meterFill, { width: `${pct}%` }]} />
          </View>
          <AppText style={styles.confidencePct}>
            {t.diagnose.resultConfidence} ({t.diagnose.forLayoutOnly}): {pct}%
          </AppText>
          <AppText style={styles.demoNote}>{t.diagnose.resultDemoNote}</AppText>
        </View>
      </View>

      {copy ? (
        <>
          <AppText variant="subtitle" style={styles.advisoryLead}>
            {t.diagnose.resultAdvisoryLead}
          </AppText>

          <Card style={styles.sectionCard}>
            <AppText variant="label">{t.advice.symptoms}</AppText>
            <BulletList lines={copy.symptoms} />
          </Card>

          <Card style={styles.sectionCard}>
            <AppText variant="label">{t.advice.management}</AppText>
            <BulletList lines={copy.management} />
          </Card>

          <Card style={styles.sectionCard}>
            <AppText variant="label">{t.advice.prevention}</AppText>
            <BulletList lines={copy.prevention} />
          </Card>

          <AppText variant="caption" style={styles.disclaimer}>
            {t.advice.disclaimer}
          </AppText>
        </>
      ) : null}

      <View style={styles.resultActions}>
        <PrimaryButton
          title={t.diagnose.resultStartNewDiagnosis}
          icon="camera"
          onPress={() =>
            stackNavigation.reset({
              index: 0,
              routes: [{ name: 'Capture' }],
            })
          }
        />
        <OutlineButton
          title={t.diagnose.resultBackToDiagnoseHome}
          icon="home-outline"
          onPress={() => stackNavigation.popToTop()}
        />
      </View>
      </Screen>
      <ReadAloudButton text={speechText} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 96 },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.border,
  },
  diseaseBanner: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primaryMuted,
  },
  bannerTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  bannerIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  bannerTextCol: { flex: 1, minWidth: 0 },
  bannerKicker: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  bannerDiseaseName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  bannerMeta: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontStyle: 'italic',
  },
  bannerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: spacing.md,
  },
  confidenceBlock: { gap: spacing.xs },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  confidenceLabel: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 14,
    fontWeight: '600',
  },
  meter: {
    height: 10,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
    marginTop: spacing.xs,
  },
  meterFill: {
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
  confidencePct: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  demoNote: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  advisoryLead: { marginBottom: spacing.md },
  sectionCard: { marginBottom: spacing.md },
  bulletRow: { flexDirection: 'row', marginTop: spacing.sm, gap: spacing.sm },
  bullet: { width: 16 },
  bulletText: { flex: 1 },
  disclaimer: { marginBottom: spacing.lg, fontStyle: 'italic' },
  resultActions: { marginTop: spacing.md, gap: spacing.md },
});
