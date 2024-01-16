import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SigningScreen from './SigningScreen';
import Verification from './Verification';
import ForgotPassword from './ForgotPassword';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import SplashScreen1 from '../SplashScreen1';
import SplashScreen2 from '../SplashScreen2';
import SplashScreen3 from '../SplashScreen3';

const Stack = createNativeStackNavigator();
const StackSplash = createNativeStackNavigator();

function SplashStack({ handleSplashScreenPress }) {
  return (
    <NavigationContainer>
      <StackSplash.Navigator screenOptions={{ headerShown: false }}>
        <StackSplash.Screen name="SplashScreen1" component={SplashScreen1} />
        <StackSplash.Screen name="SplashScreen2" component={SplashScreen2} />
        <StackSplash.Screen
          name="SplashScreen3"
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        >
          {(props) => (
            <SplashScreen3 {...props} onButtonPress={handleSplashScreenPress} />
          )}
        </StackSplash.Screen>
      </StackSplash.Navigator>
    </NavigationContainer>
  );
}

export default function AuthenticationMain() {
  const { token } = useContext(AuthContext);

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) {
    }
  }, [showSplash]);

  return (
    <>
      {
        !token && 
        (
          showSplash ? 
          ( <SplashStack handleSplashScreenPress={() => setShowSplash(false)} /> ) 
          :
          (
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
        )
        
      }
    </>
  )
}
