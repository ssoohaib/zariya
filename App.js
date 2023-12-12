import colorPallete from './constants/ColorPallete';
import { ToastProvider } from 'react-native-toast-notifications';
import AdminMain from './screens/Admin/AdminMain'

export default function App() {
  return (
    <ToastProvider duration={4000} animationType='zoom-in' offsetBottom={100} warningColor={colorPallete.darkBlue} >
      <AdminMain />
    </ToastProvider>
  )
}