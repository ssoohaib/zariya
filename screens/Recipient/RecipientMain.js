import  { useState, useEffect, useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import colorPallete from '../../constants/ColorPallete';
import SplashScreen1 from '../SplashScreen1';
import SplashScreen2 from '../SplashScreen2';
import SplashScreen3 from '../SplashScreen3';
import RecipientHome from './RecipientHome';
import { ToastProvider } from 'react-native-toast-notifications';
import RecipientHistory from './RecipientHistory';
import RecipientNotification from './RecipientNotification';
import RecipientProfile from './RecipientProfile';
import RecieveDonation from './RecieveDonation';
import DonationDetail from './DonationDetail';
import EditProfile from '../ProfileScreens/EditProfile';
import AnalyticsAndReports from '../ProfileScreens/AnalyticsAndReports';
import PrivacyAndTerms from '../ProfileScreens/PrivacyAndTerms';
import UpdatePassword from '../ProfileScreens/UpdatePassword';
import Verification from '../ProfileScreens/Verification';
import Congratulations from '../../components/Congratulations';
import Feedback from '../../components/Feedback';
import { AuthContext } from '../../context/AuthContext';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="RecipientHome" component={RecipientHome} options={{headerShown:false}}  />
      <Stack.Screen name="RecieveDonation" component={RecieveDonation} options={{headerShown:false}}  />
      <Stack.Screen name="DonationDetail" component={DonationDetail} options={{headerShown:false}}  />
      <Stack.Screen name="Congratulations" component={Congratulations} options={{headerShown:false}}  />
    </Stack.Navigator>
  );
}

function HistoryStack(){
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="RecipientHistory" component={RecipientHistory} options={{headerShown:false}}  />
    </Stack.Navigator>
  );
}

function Notificationstack(){
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="RecipientNotification" component={RecipientNotification} options={{headerShown:false}}  />
    </Stack.Navigator>
  );
}

function ProfileStack(){
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="RecipientProfile" component={RecipientProfile} options={{headerShown:false}}  />
      <Stack.Screen name="Feedback" component={Feedback} options={{headerShown:false}}  />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="AnalyticsAndReports" component={AnalyticsAndReports} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="PrivacyAndTerms" component={PrivacyAndTerms} />
      
    </Stack.Navigator>
  );
}

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {
        currentUser && currentUser.userType == 'recipient' &&
        <ToastProvider
          duration={4000}
          animationType='zoom-in'
          offsetBottom={100}
          warningColor={colorPallete.darkBlue}
        >
        <NavigationContainer>
          <StatusBar style='light' />
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colorPallete.mediumBlue,
                tabBarStyle: {
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  overflow: 'hidden',
                }
              }}
              sceneContainerStyle={{
                backgroundColor: 'white'
              }}
            >
              <Tab.Screen name="Home" component={MyStack} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />
              }} />
              <Tab.Screen name="History" component={HistoryStack} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="history" color={color} size={size} />
              }} />
              <Tab.Screen name="Notifications" component={Notificationstack} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="watch-later" color={color} size={size} />
              }} />
              <Tab.Screen name="Profile" component={ProfileStack} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />
              }} />
            </Tab.Navigator>
        </NavigationContainer>
        </ToastProvider>
      }
    </>
  );
}

