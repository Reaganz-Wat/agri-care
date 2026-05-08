import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { useLanguage } from '../../i18n/LanguageContext';
import type { DiagnoseStackParamList } from '../../navigation/types';
import { runDiagnosis } from '../../diagnosis/runDiagnosis';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<DiagnoseStackParamList, 'Processing'>;

const MIN_DISPLAY_MS = 1800;

type StepStatus = 'done' | 'active' | 'pending';

function StepRow({ label, status }: { label: string; status: StepStatus }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status !== 'active') {
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.25,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [status, pulse]);

  return (
    <View style={rowStyles.row}>
      {status === 'done' ? (
        <View style={[rowStyles.dot, rowStyles.dotDone]}>
          <Ionicons name="checkmark" size={11} color="#fff" />
        </View>
      ) : status === 'active' ? (
        <Animated.View style={[rowStyles.dot, rowStyles.dotActive, { opacity: pulse }]} />
      ) : (
        <View style={[rowStyles.dot, rowStyles.dotPending]} />
      )}
      <AppText
        variant="caption"
        style={[rowStyles.label, status === 'pending' && rowStyles.labelMuted]}
      >
        {label}
      </AppText>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },
  dotDone: { backgroundColor: colors.primary },
  dotActive: { backgroundColor: colors.primary },
  dotPending: { borderWidth: 2, borderColor: colors.border },
  label: { flex: 1 },
  labelMuted: { color: colors.textMuted },
});

export function ProcessingScreen({ navigation, route }: Props) {
  const { imageUri } = route.params;
  const { t } = useLanguage();

  const [stepIndex, setStepIndex] = useState(0);
  const spin = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({ title: t.diagnose.stackProcessing });
  }, [navigation, t.diagnose.stackProcessing]);

  // Spinner rotation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  // Steps advance in sync with MIN_DISPLAY_MS (4 steps × 500ms = 2000ms)
  useEffect(() => {
    const timers = [
      setTimeout(() => setStepIndex(1), 500),
      setTimeout(() => setStepIndex(2), 1000),
      setTimeout(() => setStepIndex(3), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Run the diagnosis
  useEffect(() => {
    let cancelled = false;
    const started = Date.now();

    void (async () => {
      try {
        const result = await runDiagnosis(imageUri);
        const elapsed = Date.now() - started;
        if (elapsed < MIN_DISPLAY_MS) {
          await new Promise((r) => setTimeout(r, MIN_DISPLAY_MS - elapsed));
        }
        if (cancelled) return;
        navigation.replace('Result', {
          imageUri,
          diseaseId: result.diseaseId,
          confidence: result.confidence,
        });
      } catch (e) {
        if (cancelled) return;
        const err = e instanceof Error ? e.message : String(e);
        Alert.alert(t.diagnose.diagnosisFailedTitle, `${err}\n\n${t.diagnose.diagnosisFailedMsg}`, [
          { text: t.diagnose.diagnosisFailedButton, onPress: () => navigation.replace('Capture') },
        ]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageUri, navigation, t.diagnose]);

  const rotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const steps = [
    t.diagnose.loadingStep1,
    t.diagnose.loadingStep2,
    t.diagnose.loadingStep3,
    t.diagnose.loadingStep4,
  ];

  const getStatus = (idx: number): StepStatus => {
    if (idx < stepIndex) return 'done';
    if (idx === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <View style={styles.root}>
      <Screen>
        <Card style={styles.previewCard}>
          <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />
        </Card>

        <View style={styles.center}>
          <Animated.View style={[styles.spinnerRing, { transform: [{ rotate: rotation }] }]} />

          <AppText variant="subtitle" style={styles.title}>
            {t.diagnose.processingTitle}
          </AppText>

          <View style={styles.steps}>
            {steps.map((label, i) => (
              <StepRow key={i} label={label} status={getStatus(i)} />
            ))}
          </View>

          <AppText variant="caption" style={styles.sub}>
            {t.diagnose.processingSub}
          </AppText>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  previewCard: { overflow: 'hidden', padding: 0, marginBottom: spacing.xl },
  preview: { width: '100%', height: 200, backgroundColor: colors.border },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  spinnerRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.primary,
    borderTopColor: 'transparent',
    marginBottom: spacing.md,
  },
  title: { textAlign: 'center', marginBottom: spacing.lg },
  steps: {
    alignSelf: 'stretch',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sub: { textAlign: 'center', color: colors.textMuted, paddingHorizontal: spacing.md },
});
