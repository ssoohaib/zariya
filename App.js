import React, { useContext, useEffect, useState } from 'react';
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
  useEffect(()=>{
    const subscription = Notifications.addNotificationReceivedListener(notification=>{
      // console.log(notification.request.content.data)
    })

    return ()=>subscription.remove()
  },[])

  useEffect(()=>{
    async function configurePushNotification(){
      const {status} = await Notifications.getPermissionsAsync()
      let finalStatus = status

      if(finalStatus !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted'){
        alert('Failed to get push token for push notification!')
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({'projectId': '73ae639a-6f46-4a9d-bda5-5d19a8d926e2'})
      console.log(pushTokenData)
    }

    configurePushNotification()

  },[])

  const AppNav=()=>{
    return(
      <>        
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