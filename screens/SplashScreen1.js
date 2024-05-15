import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';

function SplashScreen1({ navigation }) {
  return (
    <View style={styles.rootContainer}>
        <View></View>
        <Image style={styles.image} source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZkVW9Zs8ryvd58g8AhjaPhzcXv3Q87nXnBgXyp2u8PJq4usCm8hUES2BVkz0K08pi7d62Formr7a_FpFUAxZU97GooJ5WVrjM=w1919-h910'}} />
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