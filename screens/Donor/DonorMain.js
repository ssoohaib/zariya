import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import NgoDetailsScreen from '../NgoDetailsScreen';
import { StatusBar } from 'expo-status-bar';
import NgosListScreen from '../NgosListScreem';
import PaymentScreen from '../PaymentScreen';
import { MaterialIcons } from '@expo/vector-icons';
import DonorHistoryScreen from "./DonorHistoryScreen";
import DonorNotificationScreen from "./DonorNotifcationScreen";
import DonorProfileScreen from "./DonorProfileScreen";
import NotificationDeatilsScreen from "./NotificationDeatilsScreen";
import AnalyticsAndReportsScreen from "../ProfileScreens/AnalyticsAndReports";
import PrivacyAndTermsScreen from "../ProfileScreens/PrivacyAndTerms";
import DonationEnterScreen from './DonationEnterScreen';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Test from './Test';
import DonationTimeLocationPicker from './DonationTimeLocationPicker';
import SubscriptionScreen from './SubscriptionScreen';
import DonorEditProfile from './DonorEditProfile';

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
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
        {/* <Stack.Screen name="Test" component={Test} options={{headerShown:false}}  /> */}
        <Stack.Screen name="DonationEnter" component={DonationEnterScreen}  />
        <Stack.Screen name="DonationTimeLocationPicker" component={DonationTimeLocationPicker} options={{title:'Post'}} />
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

function DonorNotifactionStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerTintColor:colorPallete.screenBg,
        headerStyle:{
          backgroundColor:colorPallete.mediumBlue
        }
      }}>
        <Stack.Screen name="NotificationScreen" component={DonorNotificationScreen} options={{headerShown:false}}  />
        <Stack.Screen name="NotificationDeatils" component={NotificationDeatilsScreen} 
        options={{title:"Details", headerShown:true}}  />
        <Stack.Screen name="NgoDetails2" component={NgoDetailsScreen} options={{
          headerTitle:"",
          headerTintColor:colorPallete.screenBg,
          headerTransparent:true,
        }} />
        
      </Stack.Navigator>
    );
}

function DonorProfileStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="ProfileScreen" component={DonorProfileScreen} options={{headerShown:false}}  />
      <Stack.Screen name="EditProfile" component={DonorEditProfile} options={{headerTitle:"Edit"}}/>
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{headerTitle:"Subscriptions"}}/>
      <Stack.Screen name="AnalyticsAndReports" component={AnalyticsAndReportsScreen} options={{headerTitle:"Analytics & Reports"}}/>
      <Stack.Screen name="PrivacyAndTerms" component={PrivacyAndTermsScreen} options={{headerTitle:"Privacy & Terms"}}/>
      
      
    </Stack.Navigator>
  );
}

export default function DonorMain() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {
        currentUser && currentUser.userType == 'donor' &&
        <NavigationContainer>
          <StatusBar style='light' />

          <Tab.Navigator 
          screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:colorPallete.mediumBlue,
            tabBarStyle:{
              borderTopLeftRadius:8,
              borderTopRightRadius:8,
              overflow:'hidden',
            }
          }}
          sceneContainerStyle={{
            backgroundColor:'white'
          }}>
          
            <Tab.Screen name="Home" component={MyStack} options={{
              tabBarIcon:({color, size})=><MaterialIcons name="home" color={color} size={size} />
            }} />
            <Tab.Screen name="Donor History" component={DonorHistoryScreen}  options={{
              title:'History',
              tabBarIcon:({color, size})=><MaterialIcons name="history" color={color} size={size} />
            }} />
            <Tab.Screen name="Donor Notification" component={DonorNotifactionStack}  options={{
              title:'Notifications',
              tabBarIcon:({color, size})=><MaterialIcons name="watch-later" color={color} size={size} />
            }} />
            <Tab.Screen name="Donor Profile" component={DonorProfileStack}  options={{
              title:'Profile',
              tabBarIcon:({color, size})=><MaterialIcons name="person" color={color} size={size} />
            }} />

          </Tab.Navigator>
        </NavigationContainer>
      }
    </>
  )
}
