import { useLayoutEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaizeCropIcon } from '../../components/MaizeCropIcon';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OutlineButton } from '../../components/OutlineButton';
import { useLanguage } from '../../i18n/LanguageContext';
import type { DiagnoseStackParamList } from '../../navigation/types';
import type { RootTabParamList } from '../../navigation/types';
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
  const rootNavigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const record = getDiseaseById(diseaseId);
  const copy = record ? getDiseaseCopy(record, language) : null;
  const diseaseTitle = copy?.name ?? diseaseId;
  const acholiName = record?.ach.name;

  useLayoutEffect(() => {
    stackNavigation.setOptions({ title: diseaseTitle });
  }, [stackNavigation, diseaseTitle]);

  const pct = Math.round(confidence * 100);
  const isHealthy = diseaseId === 'healthy';
  const isNotMaize = diseaseId === 'not_maize_leaf';

  if (isNotMaize) {
    return (
      <Screen scroll contentStyle={styles.scroll}>
        <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />

        <View style={styles.notMaizeBanner}>
          <Ionicons name="alert-circle" size={40} color={colors.primaryDark} />
          <AppText variant="subtitle" style={styles.notMaizeTitle}>
            {t.diagnose.resultNotMaizeTitle}
          </AppText>
          {acholiName ? (
            <AppText style={styles.notMaizeAcholi}>{acholiName}</AppText>
          ) : null}
          <AppText variant="body" style={styles.notMaizeMsg}>
            {t.diagnose.resultNotMaizeMsg}
          </AppText>
        </View>

        <PrimaryButton
          title={t.diagnose.resultScanMaizeLeaf}
          icon="camera"
          onPress={() =>
            stackNavigation.reset({
              index: 0,
              routes: [{ name: 'Capture' }],
            })
          }
        />
      </Screen>
    );
  }

  return (
    <Screen scroll contentStyle={styles.scroll}>
      {/* Captured photo */}
      <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />

      {/* Disease banner */}
      <View style={[styles.diseaseBanner, isHealthy && styles.diseaseBannerHealthy]}>
        <View style={styles.bannerTop}>
          <View style={styles.bannerIconWrap}>
            <MaizeCropIcon size={44} noShadow />
          </View>
          <View style={styles.bannerTextCol}>
            <AppText style={styles.bannerKicker}>{t.diagnose.resultMaizeDiseaseLabel}</AppText>
            <AppText style={styles.bannerDiseaseName} numberOfLines={4}>
              {diseaseTitle}
            </AppText>
            {acholiName && acholiName !== diseaseTitle ? (
              <View style={styles.acholiTag}>
                <AppText style={styles.acholiLabel}>Leb Acholi: </AppText>
                <AppText style={styles.acholiName}>{acholiName}</AppText>
              </View>
            ) : null}
            {copy ? (
              <AppText style={styles.bannerSubtitle} numberOfLines={3}>
                {copy.shortDescription}
              </AppText>
            ) : null}
            <AppText style={styles.bannerMeta}>{t.diagnose.resultFromAnalysis}</AppText>
          </View>
        </View>

        <View style={styles.bannerDivider} />

        {/* Confidence meter */}
        <View style={styles.confidenceBlock}>
          <View style={styles.badgeRow}>
            <Ionicons name="analytics" size={16} color="rgba(255,255,255,0.9)" />
            <AppText style={styles.confidenceLabel}>{t.diagnose.resultLikely}</AppText>
            <AppText style={styles.confidencePct}>{pct}%</AppText>
          </View>
          <View style={styles.meter}>
            <View style={[styles.meterFill, { width: `${pct}%` as `${number}%` }]} />
          </View>
          <AppText style={styles.demoNote}>{t.diagnose.resultDemoNote}</AppText>
        </View>
      </View>

      {/* Advisory sections */}
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

      {/* Actions */}
      <View style={styles.resultActions}>
        <PrimaryButton
          title="Scan Another Leaf"
          icon="camera"
          onPress={() =>
            stackNavigation.reset({
              index: 0,
              routes: [{ name: 'Capture' }],
            })
          }
        />
        <OutlineButton
          title="Back to Home"
          icon="home-outline"
          onPress={() => rootNavigation.navigate('Home')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 96 },

  photo: {
    width: '100%',
    height: 210,
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
  diseaseBannerHealthy: {
    backgroundColor: '#166534',
    borderColor: '#4ADE80',
  },

  notMaizeBanner: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  notMaizeTitle: { textAlign: 'center', marginTop: spacing.sm },
  notMaizeAcholi: {
    fontStyle: 'italic',
    color: colors.textMuted,
    textAlign: 'center',
  },
  notMaizeMsg: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  bannerTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  bannerIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bannerTextCol: { flex: 1, minWidth: 0 },
  bannerKicker: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  bannerDiseaseName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: spacing.xs,
  },
  acholiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  acholiLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontStyle: 'italic',
  },
  acholiName: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  bannerMeta: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    fontStyle: 'italic',
  },

  bannerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: spacing.md,
  },

  confidenceBlock: { gap: spacing.xs },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  confidenceLabel: {
    flex: 1,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },
  confidencePct: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  meter: {
    height: 8,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
  demoNote: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },

  advisoryLead: { marginBottom: spacing.md },
  sectionCard: { marginBottom: spacing.md },
  bulletRow: { flexDirection: 'row', marginTop: spacing.sm, gap: spacing.sm },
  bullet: { width: 16 },
  bulletText: { flex: 1 },
  disclaimer: { marginBottom: spacing.lg, fontStyle: 'italic' },

  resultActions: { gap: spacing.md },
});
