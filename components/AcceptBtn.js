// AcceptDonationBtn.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ColorPallete from '../constants/ColorPallete';

function AcceptDonationBtn({ onPress, children }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Call the onPress prop if it's provided
    } else {
      // If onPress is not provided, navigate to the default screen (DonationDetail)
      navigation.navigate('DonationDetail');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorPallete.mediumBlue,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',

  },
  buttonText: {
    fontSize: 13,
    color: ColorPallete.screenBg,
    fontWeight: 'bold',
    padding:8
  },
});

export default AcceptDonationBtn;
