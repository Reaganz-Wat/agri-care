import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { DiagnoseStack } from './DiagnoseStack';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootTabParamList } from './types';

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
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: insets.bottom + 8,
          height: 62 + insets.bottom,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Home') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Diagnose') {
            return (
              <Ionicons
                name={focused ? 'camera' : 'camera-outline'}
                size={size}
                color={color}
              />
            );
          }
          return (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Diagnose" component={DiagnoseStack} options={{ tabBarLabel: 'Scan' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'More' }} />
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
