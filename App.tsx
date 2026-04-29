import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { RootNavigator } from './src/navigation/RootNavigator';

void SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
