import { Text, Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ColorPallete from '../constants/ColorPallete';

function SplashScreen2({ navigation }) {
  // Get the width of the screen
  const screenWidth = Dimensions.get('window').width;

  // Calculate the image height proportionally
  const imageHeight = (screenWidth / 380) * 400;

  return (
    <View style={styles.rootContainer}>
      <Image style={{ height: imageHeight, width: screenWidth }}
        source={require('../assets/images/splash-screen2.png')} />
      <Text style={styles.mainText}>Empowering Unity, Elevating Lives</Text>
      <Text style={styles.descriptionText}> Together, we create a ripple effect of positive
        change that transforms lives and uplifts communities.</Text>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('SplashScreen3')}>
        <Ionicons name='arrow-forward-circle' size={50} color='#453953' />
      </TouchableOpacity>
    </View>
  )
}

export default SplashScreen2;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: ColorPallete.darkBlue,
    marginTop: 80,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '100',
    textAlign: 'center',
    marginTop: 10,
    color: ColorPallete.darkBlue,
  },
  iconContainer: {
    marginTop: 100,
    marginLeft: 10,
    marginBottom: 70,
  },
});
