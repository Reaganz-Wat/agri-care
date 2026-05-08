import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { AppText } from '../../components/AppText';
import { PhotoCaptureChoice } from '../../components/PhotoCaptureChoice';
import { useLanguage } from '../../i18n/LanguageContext';
import type { DiagnoseStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

type Props = NativeStackScreenProps<DiagnoseStackParamList, 'Capture'>;

export function CaptureScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const [galleryBusy, setGalleryBusy] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Scan Leaf' });
  }, [navigation]);

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

  const hint = Platform.OS === 'web' ? t.diagnose.webCameraHint : t.diagnose.nativeCameraHint;

  return (
    <Screen scroll contentStyle={styles.scroll}>
      {/* Instruction strip */}
      <View style={styles.instructionStrip}>
        <Ionicons name="leaf-outline" size={18} color={colors.primaryMuted} />
        <AppText style={styles.instructionText}>
          Fill the frame with a maize leaf in good light for best results
        </AppText>
      </View>

      {/* Camera & gallery choice */}
      <PhotoCaptureChoice
        onCamera={takePhoto}
        onGallery={pickFromGallery}
        galleryLoading={galleryBusy}
      />

      {/* Hint card */}
      <View style={styles.hintCard}>
        <Ionicons
          name={Platform.OS === 'web' ? 'desktop-outline' : 'sunny-outline'}
          size={18}
          color={colors.warning}
        />
        <AppText style={styles.hintText}>{hint}</AppText>
      </View>

      <AppText style={styles.note}>{t.diagnose.captureNote}</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  instructionStrip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryMuted,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: colors.primaryDark,
    lineHeight: 20,
    fontWeight: '500',
  },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: '#FFFBEB',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  hintText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 19,
  },
  note: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
  },
});
