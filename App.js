import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import FoodDonationScreen from './screens//FoodDonationScreen';
import ClothesDonationScreen from './screens/ClothesDonationScreen';
import RationDonationScreen from './screens/RationDonationScreen';
import MedicineDonationScreen from './screens/MedicineDonationScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FoodDonation" component={FoodDonationScreen} />
      <Stack.Screen name="RationDonation" component={RationDonationScreen} />
      <Stack.Screen name="ClothesDonation" component={ClothesDonationScreen} />
      <Stack.Screen name="MedicineDonation" component={MedicineDonationScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MyStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

