import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaizeCropIcon } from '../components/MaizeCropIcon';
import { AppText } from '../components/AppText';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import type { RootTabParamList } from '../navigation/types';

type NavProp = BottomTabNavigationProp<RootTabParamList>;

const CONDITIONS = [
  { name: 'Common Rust',         dot: '#D97706' },
  { name: 'Gray Leaf Spot',      dot: '#718096' },
  { name: 'Northern Leaf Blight',dot: '#92400E' },
  { name: 'Maize Leaf Blight',   dot: '#C53030' },
  { name: 'Healthy Maize',       dot: colors.primary },
] as const;

export function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  function goToScan() {
    navigation.navigate('Diagnose', { screen: 'Capture' });
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaizeCropIcon size={32} noShadow />
          <AppText style={styles.appName}>AGRICARE</AppText>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsBtn}
          accessibilityLabel="Settings"
          hitSlop={12}
        >
          <Ionicons name="settings-outline" size={22} color={colors.primaryDark} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Greeting ── */}
        <AppText style={styles.greeting}>Ready to check your crop?</AppText>
        <AppText style={styles.greetingSub}>
          Point your camera at a maize leaf to detect disease instantly.
        </AppText>

        {/* ── Scan CTA card ── */}
        <Pressable
          style={({ pressed }) => [styles.scanCard, pressed && styles.scanCardPressed]}
          onPress={goToScan}
          accessibilityRole="button"
          accessibilityLabel="Scan a maize leaf"
        >
          <View style={styles.scanIconCircle}>
            <Ionicons name="camera" size={34} color="#fff" />
          </View>
          <View style={styles.scanCardText}>
            <AppText style={styles.scanCardTitle}>Scan a Maize Leaf</AppText>
            <AppText style={styles.scanCardSub}>
              Take a photo or choose from gallery for an instant result
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.6)" />
        </Pressable>

        {/* ── Photo tip strip ── */}
        <View style={styles.tipStrip}>
          <Ionicons name="sunny-outline" size={15} color={colors.warning} />
          <AppText style={styles.tipText}>
            Best results in good daylight · Fill the frame with the leaf
          </AppText>
        </View>

        {/* ── Conditions section ── */}
        <AppText style={styles.sectionLabel}>DETECTABLE CONDITIONS</AppText>
        <View style={styles.conditionsCard}>
          {CONDITIONS.map((c, i) => (
            <View
              key={c.name}
              style={[
                styles.conditionRow,
                i < CONDITIONS.length - 1 && styles.conditionRowDivider,
              ]}
            >
              <View style={[styles.conditionDot, { backgroundColor: c.dot }]} />
              <AppText style={styles.conditionName}>{c.name}</AppText>
              {c.name === 'Healthy Maize' && (
                <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              )}
            </View>
          ))}
        </View>

        {/* ── Offline note ── */}
        <View style={styles.offlineNote}>
          <Ionicons name="cloud-offline-outline" size={15} color={colors.textMuted} />
          <AppText style={styles.offlineText}>
            Diagnosis runs entirely on this device — no internet needed.
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  appName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 1,
  },
  settingsBtn: {
    padding: spacing.xs,
  },

  /* Scroll */
  scroll: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },

  /* Greeting */
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  greetingSub: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },

  /* Scan CTA */
  scanCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scanCardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  scanIconCircle: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  scanCardText: {
    flex: 1,
  },
  scanCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  scanCardSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 18,
  },

  /* Tip */
  tipStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#FFFBEB',
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },

  /* Conditions */
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  conditionsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  conditionRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  conditionDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    flexShrink: 0,
  },
  conditionName: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },

  /* Offline note */
  offlineNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  offlineText: {
    flex: 1,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
});
