import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { ToastProvider } from 'react-native-toast-notifications';
import AdminNotificationScreen from './AdminNotificationScreen';
import AdminSupportScreen from './AdminSupportScreen';
import AdminProfileScreen from './AdminProfileScreen';
import AdminHomeScreen from './AdminHomeScreen';
import AdminDonorScreen from './AdminDonorScreen';
import AdminRecipientScreen from './AdminRecipientScreen';
import FeedbackScreen from './FeedbackScreen';
import SearchDonorScreen from './SearchDonorScreen';
import SearchRecipientScreen from './SearchRecipientScreen';
import AdminReportScreen from './AdminReportScreen';
import RecipientRequestScreen from './RecipientRequestScreen';
import SupportTextScreen from './SupportTextScreen';
import AdminRecipientProfileScreen from './AdminRecipientProfileScreen';
import AdminRecipientRequestDetails from './AdminRecipientRequestDetails';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { getAllUsers } from '../../utilities/AuthFetches';

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
      <Stack.Screen name="AdminReportScreen" component={AdminReportScreen} options={{title:'Reports', headerBackTitle: "Back"}}  />
      <Stack.Screen name="RecipientRequestScreen" component={RecipientRequestScreen} options={{title:'Requests', headerBackTitle: "Back"}}  />
      <Stack.Screen name="SupportTextScreen" component={SupportTextScreen} options={{title:'Support', headerBackTitle: "Back"}}  />
      <Stack.Screen name="AdminDonorScreen" component={AdminDonorScreen} options={{title:'', headerBackTitle: "Back"}}  />
      <Stack.Screen name="AdminRecipientProfileScreen" component={AdminRecipientProfileScreen} options={{title:'', headerBackTitle: "Back"}}  />
      <Stack.Screen name="AdminRecipientRequestDetails" component={AdminRecipientRequestDetails} options={{title:'', headerBackTitle: "Back"}}  />
    </Stack.Navigator>
  );
}


export default function App() {
  const {currentUser} = useContext(AuthContext);

  return (
    <>
      {
        currentUser && currentUser.userType == 'admin' &&
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
                  {/* <Tab.Screen name="Notifications" component={AdminNotificationScreen} options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="watch-later" color={color} size={size} />
                  }} /> */}
                  {/* <Tab.Screen name="Support" component={AdminSupportScreen} options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="history" color={color} size={size} />
                  }} /> */}
                  <Tab.Screen name="Profile" component={AdminProfileScreen} options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />
                  }} />
              </Tab.Navigator>
          </NavigationContainer>
        </ToastProvider>
      }
    </>
  );
}

