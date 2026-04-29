import {
  Pressable,
  type PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
type Props = PressableProps & {
  title: string;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function PrimaryButton({ title, loading, icon, disabled, ...rest }: Props) {
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        inactive && styles.disabled,
        pressed && !inactive && styles.pressed,
      ]}
      disabled={inactive}
      {...rest}
    >
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            {icon ? (
              <Ionicons name={icon} size={22} color="#fff" style={styles.icon} />
            ) : null}
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
  label: { color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center', flexShrink: 1 },
});
