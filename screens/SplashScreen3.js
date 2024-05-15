import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ColorPallete from '../constants/ColorPallete';

function SplashScreen3({ onButtonPress, navigation }) {
    return (
      <View style={styles.rootContainer}>
        <Image style={styles.image} source={{uri:'https://lh3.googleusercontent.com/u/2/drive-viewer/AKGpihaoHx8IHl_iigh9mY8nJ8LGrISapv4kLAJ3damPWnc9NA1RxZGzGF1Dopn7QhmGZKN7GgNDIJrXLxTxoSN6jjahAO4XH-3tjBk=w1919-h910-rw-v1'}} />
        <View style={{
          paddingHorizontal:16,
          alignItems: 'center',
        }}>
          <Text style={styles.mainText}>Preserving Tomorrow, One Plate at a Time</Text>
          <Text style={styles.descriptionText}>Join our mission to nourish hope and sustain futures through the power 
              of compassionate giving.</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={() => {
            onButtonPress();
            navigation.navigate('HomeScreen');
          }}>
            <Ionicons name='arrow-forward-circle' size={50} color='#453953' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

export default SplashScreen3;

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center', 
      justifyContent: 'center', 
    },
    image: {
      height: 300,
      width: 350,
    },
    mainText: {
      marginTop: 90,
      fontWeight: 'bold',
      fontSize: 27,
      textAlign: 'center', 
      color: ColorPallete.darkBlue,
    },
    descriptionText: {
      fontSize: 13,
      // fontWeight: '100',
      lineHeight:18,
      textAlign: 'center',
      color: ColorPallete.lightTextColor,
      padding: 12,
    },
    iconContainer: {
      marginTop: 70,
      // marginLeft: 10,
    },
  });