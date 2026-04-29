import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { AppText } from './AppText';

type Props = {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function OutlineButton({ title, onPress, icon, loading, style }: Props) {
  const inactive = loading;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [
        styles.base,
        inactive && styles.disabled,
        pressed && !inactive && styles.pressed,
        style,
      ]}
    >
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator color={colors.primaryDark} />
        ) : (
          <>
            {icon ? (
              <Ionicons name={icon} size={22} color={colors.primaryDark} style={styles.icon} />
            ) : null}
            <AppText style={styles.label}>{title}</AppText>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.55 },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { marginRight: spacing.sm },
  label: { color: colors.primaryDark, fontSize: 17, fontWeight: '700' },
});
