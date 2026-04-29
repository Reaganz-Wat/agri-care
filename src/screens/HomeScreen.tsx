import { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaizeCropIcon } from '../components/MaizeCropIcon';
import { Screen } from '../components/Screen';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { useLanguage } from '../i18n/LanguageContext';
import { speechHome } from '../speech/speechScripts';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import type { RootTabParamList } from '../navigation/types';

export function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const { t } = useLanguage();
  const speechText = useMemo(() => speechHome(t), [t]);

  const overviewBullets = useMemo(
    () => [t.home.overviewBullet1, t.home.overviewBullet2, t.home.overviewBullet3],
    [t]
  );

  return (
    <View style={styles.root}>
      <Screen scroll contentStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.logoMark}>
            <MaizeCropIcon size={76} noShadow />
          </View>
          <AppText variant="title" style={styles.heroTitle}>
            AGRICARE
          </AppText>
          <AppText variant="caption" style={styles.heroSub}>
            {t.home.heroSub}
          </AppText>
        </View>

        <AppText variant="label" style={styles.sectionLabel}>
          {t.home.overviewSectionLabel}
        </AppText>
        <Card style={styles.card}>
          <AppText variant="body" style={styles.overviewIntro}>
            {t.home.overviewIntro}
          </AppText>
          {overviewBullets.map((line) => (
            <View key={line} style={styles.bulletRow}>
              <AppText variant="body" style={styles.bulletMark}>
                •
              </AppText>
              <AppText variant="body" style={styles.bulletText}>
                {line}
              </AppText>
            </View>
          ))}
        </Card>

        <Pressable style={styles.settingsTile} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color={colors.primaryDark} />
          <AppText variant="caption" style={styles.settingsTileText}>
            {t.home.settingsShortcut}
          </AppText>
        </Pressable>
      </Screen>
      <ReadAloudButton text={speechText} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingTop: spacing.md, paddingBottom: 120 },
  hero: { marginBottom: spacing.lg, alignItems: 'center' },
  logoMark: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
  },
  heroTitle: { textAlign: 'center', marginBottom: spacing.xs },
  heroSub: { textAlign: 'center', maxWidth: 320 },
  sectionLabel: { marginBottom: spacing.md },
  card: { marginBottom: spacing.lg },
  overviewIntro: { marginBottom: spacing.md },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bulletMark: { marginTop: 2 },
  bulletText: { flex: 1 },
  settingsTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingsTileText: { flex: 1 },
});
