import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useLanguage } from '../i18n/LanguageContext';
import { HomeScreen } from '../screens/HomeScreen';
import { DiagnoseStack } from './DiagnoseStack';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootTabParamList } from './types';

const MAIZE_TAB_ICON = require('../../assets/maize-plant-icon.png');

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    text: colors.text,
    card: colors.surface,
    border: colors.border,
  },
};

function MainTabs() {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: 8,
          height: 62,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Diagnose') {
            return (
              <Image
                source={MAIZE_TAB_ICON}
                style={{
                  width: Math.max(size, 26),
                  height: Math.max(size, 26),
                  opacity: focused ? 1 : 0.78,
                }}
                resizeMode="contain"
                accessibilityIgnoresInvertColors
              />
            );
          }
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          }
          return <Ionicons name="settings" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: t.tabs.home }}
      />
      <Tab.Screen
        name="Diagnose"
        component={DiagnoseStack}
        options={{ tabBarLabel: t.tabs.diagnose }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: t.tabs.more }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <MainTabs />
    </NavigationContainer>
  );
}
