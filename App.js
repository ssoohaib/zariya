import colorPallete from './constants/ColorPallete';
import { ToastProvider } from 'react-native-toast-notifications';
import RecipientMain from './screens/Recipient/RecipientMain';
import DonorMain from './screens/Donor/DonorMain';

export default function App() {
  return (
    <ToastProvider duration={4000} animationType='zoom-in' offsetBottom={100} warningColor={colorPallete.darkBlue} >
      <RecipientMain />
    </ToastProvider>
  )
}