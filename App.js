import React, { useContext } from 'react';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import colorPallete from './constants/ColorPallete';
import { ToastProvider } from 'react-native-toast-notifications';
import AdminMain from './screens/Admin/AdminMain'
import RecipientMain from './screens/Recipient/RecipientMain';
import DonorMain from './screens/Donor/DonorMain';
import AuthenticationMain from './screens/Authentication/AuthenticationMain'

export default function App() {

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