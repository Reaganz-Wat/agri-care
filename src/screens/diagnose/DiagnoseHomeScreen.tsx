import { useLayoutEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MaizeCropIcon } from '../../components/MaizeCropIcon';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { PhotoCaptureChoice } from '../../components/PhotoCaptureChoice';
import { ReadAloudButton } from '../../components/ReadAloudButton';
import { useLanguage } from '../../i18n/LanguageContext';
import type { DiagnoseStackParamList } from '../../navigation/types';
import { speechDiagnoseHome } from '../../speech/speechScripts';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

type Props = NativeStackScreenProps<DiagnoseStackParamList, 'DiagnoseHome'>;

export function DiagnoseHomeScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const speechText = useMemo(() => speechDiagnoseHome(t), [t]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t.diagnose.homeTitle });
  }, [navigation, t.diagnose.homeTitle]);

  const steps = [
    { n: '1', text: t.diagnose.step1 },
    { n: '2', text: t.diagnose.step2 },
    { n: '3', text: t.diagnose.step3 },
  ];

  const goCapture = () => navigation.navigate('Capture');

  return (
    <View style={styles.root}>
      <Screen scroll contentStyle={styles.scroll}>
        <Card style={styles.tip}>
          <View style={styles.tipRow}>
            <Ionicons name="sunny" size={22} color={colors.warning} />
            <AppText variant="body" style={styles.tipText}>
              {t.diagnose.tipPhoto}
            </AppText>
          </View>
        </Card>

        <PhotoCaptureChoice onCamera={goCapture} onGallery={goCapture} />

        <AppText variant="subtitle" style={styles.h2}>
          {t.diagnose.howItWorks}
        </AppText>
        <View style={styles.steps}>
          {steps.map((s) => (
            <View key={s.n} style={styles.step}>
              <View style={styles.badge}>
                <AppText style={styles.badgeText}>{s.n}</AppText>
              </View>
              <AppText variant="body" style={styles.stepText}>
                {s.text}
              </AppText>
            </View>
          ))}
        </View>

        <View style={styles.illus}>
          <View style={styles.illusFrame}>
            <MaizeCropIcon size={64} />
            <AppText variant="caption" style={styles.illusCaption}>
              {t.diagnose.illusCaption}
            </AppText>
          </View>
        </View>
      </Screen>
      <ReadAloudButton text={speechText} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 120 },
  tip: { marginBottom: spacing.lg, backgroundColor: colors.accent, borderColor: colors.primaryMuted },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  tipText: { flex: 1 },
  h2: { marginBottom: spacing.md, marginTop: spacing.sm },
  steps: { gap: spacing.md, marginBottom: spacing.lg },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  badge: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontWeight: '800' },
  stepText: { flex: 1 },
  illus: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  illusFrame: {
    width: '100%',
    minHeight: 120,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  illusCaption: { textAlign: 'center', marginTop: spacing.sm, maxWidth: 280 },
});
