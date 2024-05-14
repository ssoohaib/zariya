import React, { useContext, useEffect } from 'react';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import colorPallete from './constants/ColorPallete';
import { ToastProvider } from 'react-native-toast-notifications';
import 'react-native-reanimated';
import AdminMain from './screens/Admin/AdminMain'
import RecipientMain from './screens/Recipient/RecipientMain';
import DonorMain from './screens/Donor/DonorMain';
import AuthenticationMain from './screens/Authentication/AuthenticationMain'
import * as Notifications from 'expo-notifications';
import { Linking, Pressable, Text } from 'react-native';
import DonorSupport from './screens/Donor/DonorSupport';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  // useEffect(()=>{
  //   const subscription = Notifications.addNotificationReceivedListener(notification=>{
  //     console.log('recieved')
  //     console.log(notification)

  //   })

  //   return ()=>subscription.remove()
  // },[])

  const handleNotification = async ()=>{
    console.log('first')
    await Notifications.scheduleNotificationAsync({
      content:{
        title:'Test Notification',
        body:'This is a test notification',
        data:{data:'goes here'}
      },
      trigger:{
        seconds:2,
        
      },
    })
  }

  

  const AppNav=()=>{
    return(
      <>
        {/* <Pressable onPress={handleNotification} style={{marginTop:100, padding:16, borderWidth:1}} >
          <Text>Notification</Text>
        </Pressable> */}
        
        <AuthenticationMain />
        <AdminMain />
        <DonorMain />
        <RecipientMain />
      </>
    )
  }

  return (
    <ToastProvider duration={4000} animationType='zoom-in' offsetBottom={100} warningColor={colorPallete.darkBlue} >
      <AuthContextProvider>
        {AppNav()}
      </AuthContextProvider>
    </ToastProvider>
  )
}