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
import SplashScreen1 from './screens/SplashScreen1';
import colorPallete from './constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import NgosListScreen from './screens/NgosListScreem';
import PaymentScreen from './screens/PaymentScreen';
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = AnimatedTabBarNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      {/* <Stack.Screen name="SplashScreen1" component={SplashScreen1} options={{
        headerTitle:"",
        headerTintColor:colorPallete.screenBg,
        headerTransparent:true,
        headerStyle:{}
        }} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
      <Stack.Screen name="Food" component={FoodDonationScreen} />
      <Stack.Screen name="Ration" component={RationDonationScreen} />
      <Stack.Screen name="Clothes" component={ClothesDonationScreen} />
      <Stack.Screen name="Medicine" component={MedicineDonationScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="NgosList" component={NgosListScreen} options={{title:'All'}} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{title:'Donation'}} />
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
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Tab.Navigator 
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:colorPallete.mediumBlue,
        // tabBarActiveBackgroundColor:colorPallete.lightBlue,
        
        tabBarStyle:{
          // backgroundColor:'red'
          // borderWidth:1,
          // borderRadius:8,
          borderTopLeftRadius:8,
          borderTopRightRadius:8,
          overflow:'hidden',
          // paddingVertical:8

        }
      }}
      sceneContainerStyle={{
        backgroundColor:'white'
      }}
      
      >
        <Tab.Screen name="Home" component={MyStack} options={{
          tabBarIcon:({color, size})=><MaterialIcons name="home" color={color} size={size} />
        }} />
        <Tab.Screen name="History" component={HistoryScreen}  options={{
          tabBarIcon:({color, size})=><MaterialIcons name="history" color={color} size={size} />
        }} />
        <Tab.Screen name="Notifications" component={NotificationScreen}  options={{
          tabBarIcon:({color, size})=><MaterialIcons name="watch-later" color={color} size={size} />
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen}  options={{
          tabBarIcon:({color, size})=><MaterialIcons name="person" color={color} size={size} />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

