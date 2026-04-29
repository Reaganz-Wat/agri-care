import { Image, Platform, View, type ImageProps, type StyleProp, type ViewStyle } from 'react-native';

const SOURCE = require('../../assets/maize-plant-icon.png');

const FRAME_SHADOW: ViewStyle =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.14,
        shadowRadius: 4,
      }
    : { elevation: 3 };

type Props = Omit<ImageProps, 'source' | 'style'> & {
  size?: number;
  style?: StyleProp<ViewStyle>;
  /** When true, skip drop shadow (e.g. on solid badges) */
  noShadow?: boolean;
};

/** Maize plant artwork — matches the app icon (isolated on white). */
export function MaizeCropIcon({
  size = 48,
  style,
  noShadow,
  accessibilityLabel = 'Maize plant',
  ...rest
}: Props) {
  const frame: ViewStyle = {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    ...(noShadow ? {} : FRAME_SHADOW),
  };

  return (
    <View style={[frame, style]}>
      <Image
        source={SOURCE}
        style={{ width: size, height: size }}
        resizeMode="contain"
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        {...rest}
      />
    </View>
  );
}
