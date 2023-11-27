import { NavigationContainer } from '@react-navigation/native';
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
import colorPallete from './constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import NgosListScreen from './screens/NgosListScreem';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = AnimatedTabBarNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
      <Stack.Screen name="Food" component={FoodDonationScreen} />
      <Stack.Screen name="Ration" component={RationDonationScreen} />
      <Stack.Screen name="Clothes" component={ClothesDonationScreen} />
      <Stack.Screen name="Medicine" component={MedicineDonationScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="NgosList" component={NgosListScreen} options={{title:'All'}} />
      <Stack.Screen name="NgoDetails" component={NgoDetailsScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Tab.Navigator 
      screenOptions={{
        headerShown:false,
      }}
      sceneContainerStyle={{
        backgroundColor:'white'
      }}
      
      >
        <Tab.Screen name="Home" component={MyStack} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

