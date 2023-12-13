import colorPallete from './constants/ColorPallete';
import { ToastProvider } from 'react-native-toast-notifications';
import AdminMain from './screens/Admin/AdminMain'
import RecipientMain from './screens/Recipient/RecipientMain';
import DonorMain from './screens/Donor/DonorMain';
import AuthenticationMain from './screens/Authentication/AuthenticationMain'
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState()

  return (
    <ToastProvider duration={4000} animationType='zoom-in' offsetBottom={100} warningColor={colorPallete.darkBlue} >
      {/* <AdminMain /> */}
      {
        !user &&
        <AuthenticationMain />
      }
      {
        user && 
        (
          user.userType=='donor'?
          <DonorMain />
          :
          <RecipientMain />
        )
      }
    </ToastProvider>
  )
}