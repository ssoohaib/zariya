import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SigningScreen from './SigningScreen';
import Verification from './Verification';
import ForgotPassword from './ForgotPassword';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AuthenticationMain() {

  const { token } = useContext(AuthContext);

  return (
    <>
      {
        !token && 
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
              headerShown:false
          }}>
              <Stack.Screen name='SignIn' component={SigningScreen} />
              <Stack.Screen name='Verification' component={Verification} />
              <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          </Stack.Navigator>
      </NavigationContainer>
      }
    </>
  )
}
