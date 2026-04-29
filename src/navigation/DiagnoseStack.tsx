import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DiagnoseStackParamList } from './types';
import { DiagnoseHomeScreen } from '../screens/diagnose/DiagnoseHomeScreen';
import { CaptureScreen } from '../screens/diagnose/CaptureScreen';
import { ProcessingScreen } from '../screens/diagnose/ProcessingScreen';
import { ResultScreen } from '../screens/diagnose/ResultScreen';

const Stack = createNativeStackNavigator<DiagnoseStackParamList>();

export function DiagnoseStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#F8FAF5' },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
      }}
    >
      <Stack.Screen
        name="DiagnoseHome"
        component={DiagnoseHomeScreen}
        options={{ title: 'Diagnose maize' }}
      />
      <Stack.Screen
        name="Capture"
        component={CaptureScreen}
        options={{ title: 'Take or choose photo' }}
      />
      <Stack.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{ title: 'Diagnosing leaves…', headerBackVisible: false }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: 'Diagnosis result', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
