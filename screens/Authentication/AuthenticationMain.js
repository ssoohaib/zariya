import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SigningScreen from './SigningScreen';
import Verification from './Verification';
import ForgotPassword from './ForgotPassword';

const Stack = createNativeStackNavigator();

export default function AuthenticationMain() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='SignIn' component={SigningScreen} />
            <Stack.Screen name='Verification' component={Verification} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
