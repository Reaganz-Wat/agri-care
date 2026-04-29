import { Text, type TextProps, type TextStyle } from 'react-native';
import { colors } from '../theme/colors';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'label';

const variantStyle: Record<Variant, TextStyle> = {
  title: { fontSize: 24, fontWeight: '700', color: colors.text, letterSpacing: -0.3 },
  subtitle: { fontSize: 18, fontWeight: '600', color: colors.text },
  body: { fontSize: 16, lineHeight: 24, color: colors.text },
  caption: { fontSize: 14, lineHeight: 20, color: colors.textSecondary },
  label: { fontSize: 13, fontWeight: '600', color: colors.primaryDark, letterSpacing: 0.2 },
};

type Props = TextProps & {
  variant?: Variant;
};

export function AppText({ variant = 'body', style, ...rest }: Props) {
  return <Text style={[variantStyle[variant], style]} {...rest} />;
}
