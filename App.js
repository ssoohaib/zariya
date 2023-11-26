import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import FoodDonationScreen from './screens//FoodDonationScreen';
import ClothesDonationScreen from './screens/ClothesDonationScreen';
import RationDonationScreen from './screens/RationDonationScreen';
import MedicineDonationScreen from './screens/MedicineDonationScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import NgoDetailsScreen from './screens/NgoDetailsScreen';
import colorPallete from './constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
      <Stack.Screen name="Food" component={FoodDonationScreen} />
      <Stack.Screen name="Ration" component={RationDonationScreen} />
      <Stack.Screen name="Clothes" component={ClothesDonationScreen} />
      <Stack.Screen name="Medicine" component={MedicineDonationScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="NgoDetails" component={NgoDetailsScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Tab.Navigator 
      screenOptions={{
        headerShown:false,
        tabBarStyle:{
          // backgroundColor:'black',
        }
      }}
      // sceneContainerStyle={{
      //   backgroundColor:colorPallete.screenBg
      // }}
      >
        <Tab.Screen name="Home" component={MyStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

