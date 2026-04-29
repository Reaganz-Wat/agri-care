import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Easing, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { MaizeCropIcon } from '../../components/MaizeCropIcon';
import { ReadAloudButton } from '../../components/ReadAloudButton';
import { useLanguage } from '../../i18n/LanguageContext';
import { speechProcessing } from '../../speech/speechScripts';
import type { DiagnoseStackParamList } from '../../navigation/types';
import { runDiagnosis } from '../../diagnosis/runDiagnosis';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<DiagnoseStackParamList, 'Processing'>;

const MIN_DISPLAY_MS = 1800;

export function ProcessingScreen({ navigation, route }: Props) {
  const { imageUri } = route.params;
  const { t } = useLanguage();
  const speechText = useMemo(() => speechProcessing(t), [t]);
  const pulse = useRef(new Animated.Value(0.85)).current;

  useLayoutEffect(() => {
    navigation.setOptions({ title: t.diagnose.stackProcessing });
  }, [navigation, t.diagnose.stackProcessing]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.85,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

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
          { text: t.diagnose.diagnosisFailedButton, onPress: () => navigation.replace('DiagnoseHome') },
        ]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageUri, navigation, t.diagnose]);

  return (
    <View style={styles.root}>
      <Screen>
      <Card style={styles.previewCard}>
        <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />
        <Animated.View style={[styles.overlay, { opacity: pulse }]}>
          <AppText style={styles.overlayText}>{t.diagnose.processingOverlay}</AppText>
        </Animated.View>
      </Card>

      <View style={styles.center}>
        <MaizeCropIcon size={56} style={styles.processingMark} />
        <AppText variant="subtitle" style={styles.title}>
          {t.diagnose.processingTitle}
        </AppText>
        <AppText variant="caption" style={styles.sub}>
          {t.diagnose.processingSub}
        </AppText>
      </View>
      </Screen>
      <ReadAloudButton text={speechText} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  previewCard: { overflow: 'hidden', padding: 0, marginBottom: spacing.xl },
  preview: { width: '100%', height: 220, backgroundColor: colors.border },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  center: { flex: 1, justifyContent: 'center', paddingBottom: spacing.xxl, alignItems: 'center' },
  processingMark: { marginBottom: spacing.md },
  title: { textAlign: 'center', marginBottom: spacing.sm },
  sub: { textAlign: 'center', paddingHorizontal: spacing.sm },
});
