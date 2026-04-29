import { useLayoutEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaizeCropIcon } from '../../components/MaizeCropIcon';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { PhotoCaptureChoice } from '../../components/PhotoCaptureChoice';
import { ReadAloudButton } from '../../components/ReadAloudButton';
import { useLanguage } from '../../i18n/LanguageContext';
import type { DiagnoseStackParamList } from '../../navigation/types';
import { speechCapture } from '../../speech/speechScripts';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<DiagnoseStackParamList, 'Capture'>;

export function CaptureScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const speechText = useMemo(() => speechCapture(t), [t]);
  const [galleryBusy, setGalleryBusy] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t.diagnose.stackCapture });
  }, [navigation, t.diagnose.stackCapture]);

  async function ensureLibraryPermission(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.diagnose.permNeeded, t.diagnose.permLibrary);
      return false;
    }
    return true;
  }

  async function ensureCameraPermission(): Promise<boolean> {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.diagnose.permNeeded, t.diagnose.permCamera);
      return false;
    }
    return true;
  }

  async function pickFromGallery() {
    setGalleryBusy(true);
    try {
      const ok = await ensureLibraryPermission();
      if (!ok) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });
      if (!result.canceled && result.assets[0]) {
        navigation.replace('Processing', { imageUri: result.assets[0].uri });
      }
    } finally {
      setGalleryBusy(false);
    }
  }

  async function takePhoto() {
    const ok = await ensureCameraPermission();
    if (!ok) return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.85,
    });
    if (!result.canceled && result.assets[0]) {
      navigation.replace('Processing', { imageUri: result.assets[0].uri });
    }
  }

  const cameraHint =
    Platform.OS === 'web' ? t.diagnose.webCameraHint : t.diagnose.nativeCameraHint;

  return (
    <View style={styles.root}>
      <Screen scroll contentStyle={styles.scroll}>
        <AppText variant="title" style={styles.heading}>
          {t.diagnose.captureHeading}
        </AppText>
        <AppText variant="caption" style={styles.lead}>
          {t.diagnose.captureLead}
        </AppText>

        <AppText variant="label" style={styles.chooseLabel}>
          {t.diagnose.captureChooseMethod}
        </AppText>

        <PhotoCaptureChoice
          onCamera={takePhoto}
          onGallery={pickFromGallery}
          galleryLoading={galleryBusy}
        />

        <Card style={styles.card}>
          <View style={styles.row}>
            <MaizeCropIcon size={36} />
            <AppText variant="body" style={styles.cardText}>
              {cameraHint}
            </AppText>
          </View>
        </Card>

        <AppText variant="caption" style={styles.note}>
          {t.diagnose.captureNote}
        </AppText>
      </Screen>
      <ReadAloudButton text={speechText} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 120 },
  heading: { marginBottom: spacing.xs },
  lead: { marginBottom: spacing.md },
  chooseLabel: { marginBottom: spacing.sm },
  card: { marginTop: spacing.lg, backgroundColor: colors.accent },
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  cardText: { flex: 1 },
  note: { marginTop: spacing.lg, textAlign: 'center' },
});
