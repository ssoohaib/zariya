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
        source={{uri:'https://lh3.googleusercontent.com/u/2/drive-viewer/AKGpihaXxjTbZxHWATglQrFg5zh_uwxfPsKaXgopLcBIPzkFZpUoHj1JfSqWGf3raSA8uCm5fBV2Pls-8QjSojq-DBgUn0mO5S5IIQ=w1919-h910'}} />
        <View style={{
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent:"space-around"
        }}>
            <Text style={styles.mainText}>Empowering Unity, Elevating Lives</Text>
            <Text style={styles.descriptionText}> Together, we create a ripple effect of positive
              change that transforms lives and uplifts communities.</Text>
            <TouchableOpacity style={styles.iconContainer}
              onPress={() => navigation.navigate('SplashScreen3')}>
              <Ionicons name='arrow-forward-circle' size={50} color='#453953' />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SplashScreen2;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',

    // borderWidth:1
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
    lineHeight:18,
    // fontWeight: '100',
    textAlign: 'center',
    marginTop: 10,
    color: ColorPallete.lightTextColor,
  },
  iconContainer: {
    marginTop: 40,
    // marginLeft: 10,
    // marginBottom: 70,
  },
});
