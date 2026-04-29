import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Card } from './Card';
import { CameraButton } from './CameraButton';
import { OutlineButton } from './OutlineButton';
import { useLanguage } from '../i18n/LanguageContext';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';

type Props = {
  onCamera: () => void;
  onGallery: () => void;
  galleryLoading?: boolean;
};

/**
 * Camera (primary fill) and gallery (outline) as two separate blocks.
 */
export function PhotoCaptureChoice({ onCamera, onGallery, galleryLoading }: Props) {
  const { t } = useLanguage();

  return (
    <View style={styles.wrap}>
      <View style={styles.cameraBlock}>
        <AppText variant="subtitle" style={styles.cameraBlockTitle}>
          {t.home.cameraBlockTitle}
        </AppText>
        <View style={styles.cameraShell}>
          <CameraButton
            title={t.home.useCamera}
            accessibilityLabel={t.home.useCameraA11y}
            onPress={onCamera}
          />
        </View>
      </View>

      <View style={styles.split}>
        <View style={styles.splitLine} />
        <AppText variant="caption" style={styles.orLine}>
          {t.home.orDivider}
        </AppText>
        <View style={styles.splitLine} />
      </View>

      <View>
        <AppText variant="subtitle" style={styles.blockTitle}>
          {t.home.galleryBlockTitle}
        </AppText>
        <Card style={styles.galleryCard}>
          <OutlineButton
            title={t.home.chooseGallery}
            icon="images-outline"
            onPress={onGallery}
            loading={galleryLoading}
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  cameraBlock: { marginBottom: spacing.lg },
  cameraBlockTitle: {
    marginBottom: spacing.sm,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  /** Light frame around the primary camera CTA — matches accent cards elsewhere */
  cameraShell: {
    padding: spacing.md,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primaryMuted,
    borderRadius: radius.lg,
  },
  split: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  splitLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  orLine: {
    fontWeight: '800',
    color: colors.textMuted,
    flexShrink: 0,
  },
  blockTitle: { marginBottom: spacing.sm },
  galleryCard: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
});
