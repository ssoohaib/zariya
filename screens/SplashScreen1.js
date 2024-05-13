import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';

function SplashScreen1({ navigation }) {
  return (
    <View style={styles.rootContainer}>
        <View></View>
        <Image style={styles.image} source={require('../assets/images/logo-white.png')} />
        <TouchableOpacity style={styles.iconContainer} 
            onPress={() => navigation.navigate('SplashScreen2')}>
            <Text>next</Text>
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        height: 250,
        width: 250,
        // marginTop: 260,
        // marginLeft: 60,
    },
    iconContainer: {
      // marginTop: 170,
      // marginLeft: 160,
    },
});