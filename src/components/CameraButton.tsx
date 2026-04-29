import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Filled primary-style CTA (matches PrimaryButton). Parent `style` is merged (never replaces base styles).
 */
export function CameraButton({
  title,
  loading,
  icon = 'camera',
  disabled,
  style,
  ...rest
}: Props) {
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        inactive && styles.disabled,
        pressed && !inactive && styles.pressed,
        style,
      ]}
      disabled={inactive}
      {...rest}
    >
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name={icon} size={22} color="#fff" style={styles.icon} />
            <Text style={styles.label} numberOfLines={2}>
              {title}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  pressed: { opacity: 0.92 },
  disabled: { opacity: 0.55 },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  icon: { marginRight: spacing.sm, flexShrink: 0 },
  label: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    flexShrink: 1,
  },
});
