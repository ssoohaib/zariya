import  { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import NgoDetailsScreen from './screens/NgoDetailsScreen';
import NotificationScreen from './screens/NotificationScreen';
import HistoryScreen from './screens/HistoryScreen';
import colorPallete from './constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { ToastProvider } from 'react-native-toast-notifications';
import AdminNotificationScreen from './screens/Admin/AdminNotificationScreen';
import AdminSupportScreen from './screens/Admin/AdminSupportScreen';
import AdminProfileScreen from './screens/Admin/AdminProfileScreen';
import AdminHomeScreen from './screens/Admin/AdminHomeScreen';
import AdminDonorScreen from './screens/Admin/AdminDonorScreen';
import AdminRecipientScreen from './screens/Admin/AdminRecipientScreen';
import FeedbackScreen from './screens/Admin/FeedbackScreen';
import SearchDonorScreen from './screens/Admin/SearchDonorScreen';
import SearchRecipientScreen from './screens/Admin/SearchRecipientScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreenStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:colorPallete.screenBg,
      headerStyle:{
        backgroundColor:colorPallete.mediumBlue
      }
    }}>
      <Stack.Screen name="HomeScreen" component={AdminHomeScreen} options={{headerShown:false}}  />
      <Stack.Screen name="DonorDetailsScreen" component={AdminDonorScreen} options={{title:'Donor Details', headerBackTitle: ''}}  />
      <Stack.Screen name="RecipientDetailsScreen" component={AdminRecipientScreen} options={{title:'Recipient Details'}}  />
      <Stack.Screen name="SearchDonorScreen" component={SearchDonorScreen} options={{title:'Search Donor', headerBackTitle: "Back"}}  />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{title:'Feedbacks', headerBackTitle: "Back"}}  />
      <Stack.Screen name="SearchRecipientScreen" component={SearchRecipientScreen} options={{title:'Search Recipient', headerBackTitle: "Back"}}  />
    </Stack.Navigator>
  );
}


export default function App() {

  return (
    <ToastProvider
      duration={4000}
      animationType='zoom-in'
      offsetBottom={100}
      warningColor={colorPallete.darkBlue}>

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
              <Tab.Screen name="Home" component={HomeScreenStack} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />
              }} />
              <Tab.Screen name="Notifications" component={AdminNotificationScreen} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="watch-later" color={color} size={size} />
              }} />
              <Tab.Screen name="Support" component={AdminSupportScreen} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="history" color={color} size={size} />
              }} />
              <Tab.Screen name="Profile" component={AdminProfileScreen} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />
              }} />
          </Tab.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

