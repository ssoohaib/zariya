import  { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import HomeScreen from './screens/HomeScreen';
import FoodDonationScreen from './screens//FoodDonationScreen';
import ClothesDonationScreen from './screens/ClothesDonationScreen';
import RationDonationScreen from './screens/RationDonationScreen';
import MedicineDonationScreen from './screens/MedicineDonationScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import NgoDetailsScreen from './screens/NgoDetailsScreen';
import NotificationScreen from './screens/NotificationScreen';
import HistoryScreen from './screens/HistoryScreen';
import SplashScreen1 from './screens/SplashScreen1';
import colorPallete from './constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import NgosListScreen from './screens/NgosListScreem';
import PaymentScreen from './screens/PaymentScreen';
import PaymentDetailsScreen from './screens/PaymentDetailsScreen';
import { MaterialIcons } from '@expo/vector-icons';
//<<<<<<< eeshaw
import SplashScreen1 from './screens/SplashScreen1';
import SplashScreen2 from './screens/SplashScreen2';
import SplashScreen3 from './screens/SplashScreen3';
import RecipientMain from './screens/RecipientMain';
import RecipientHome from './screens/RecipientHome';

//=======
import { ToastProvider } from 'react-native-toast-notifications';
//>>>>>>> master


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = AnimatedTabBarNavigator();
const StackSplash = createNativeStackNavigator();

function SplashStack({ handleSplashScreenPress }) {
  return (
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
          <SplashScreen3 {...props} onButtonPress={handleSplashScreenPress} navigation={props.navigation} />
        )}
      </StackSplash.Screen>
    </StackSplash.Navigator>
  );
}


function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="RecipientHome" component={RecipientHome} options={{headerShown:false}}  />
      <Stack.Screen name="RecipientMain" component={RecipientMain} options={{headerShown:false}}  />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
      <Stack.Screen name="Food" component={FoodDonationScreen} />
      <Stack.Screen name="Ration" component={RationDonationScreen} />
      <Stack.Screen name="Clothes" component={ClothesDonationScreen} />
      <Stack.Screen name="Medicine" component={MedicineDonationScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="NgosList" component={NgosListScreen} options={{title:'All'}} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{title:'Donation'}} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} options={{title:'Details'}} />
      <Stack.Screen name="NgoDetails" component={NgoDetailsScreen} options={{
        headerTitle:"",
        headerTintColor:colorPallete.screenBg,
        headerTransparent:true,
        headerStyle:{
          // bac
        }
      }} />
    </Stack.Navigator>
  );
}


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // No need to use useNavigation here, as you are not using navigation in this component
    if (!showSplash) {
      // Navigate to the HomeScreen when the splash screen is done
      // You can use navigation.navigate if you are in a component that is part of the navigator stack
      // For example, if this useEffect was inside a screen component
      // navigation.navigate('HomeScreen');
    }
  }, [showSplash]);

  return (
    <ToastProvider
      duration={4000}
      animationType='zoom-in'
      offsetBottom={100}
      warningColor={colorPallete.darkBlue}
    >
    <NavigationContainer>
      <StatusBar style='light' />
      {showSplash ? (
        <SplashStack handleSplashScreenPress={() => setShowSplash(false)} />
      ) : (
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
          <Tab.Screen name="History" component={HistoryScreen} options={{
            tabBarIcon: ({ color, size }) => <MaterialIcons name="history" color={color} size={size} />
          }} />
          <Tab.Screen name="Notifications" component={NotificationScreen} options={{
            tabBarIcon: ({ color, size }) => <MaterialIcons name="watch-later" color={color} size={size} />
          }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />
          }} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
    </ToastProvider>
  );
}

