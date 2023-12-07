import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';

function SplashScreen1({ navigation }) {
  return (
    <View style={styles.rootContainer}>
        <Image style={styles.image} source={require('../assets/images/logo-white.png')} />
      <TouchableOpacity style={styles.iconContainer} 
      onPress={() => navigation.navigate('SplashScreen2')}>
        <Ionicons name='arrow-forward-circle' size={50} color='#F3CBA5' />
      </TouchableOpacity>
       
    </View>
  )
}

export default SplashScreen1;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: ColorPallete.darkBlue,
    },
    image: {
        height: 250,
        width: 250,
        marginTop: 260,
        marginLeft: 60,
    },
    iconContainer: {
      marginTop: 170,
      marginLeft: 160,
    },
});