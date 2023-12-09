import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AcceptDonationBtn from '../../components/AcceptDonationBtn';
import ColorPallete from '../../constants/ColorPallete';

const PrivacyAndTerms = () => {

  const [isAcceptPressed, setAcceptPressed] = useState(false);
  const [isDeclinePressed, setDeclinePressed] = useState(false);

  const handleAcceptPress = () => {
    setAcceptPressed(true);
    setDeclinePressed(false);
  };

  const handleDeclinePress = () => {
    setDeclinePressed(true);
    setAcceptPressed(false);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Privacy and Terms</Text>
      
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subHeadings}>1. Terms</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          {'\n\n'}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.subHeadings}>2. Security</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          {'\n\n'}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.subHeadings}>3. Privacy</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          {'\n\n'}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.btn, isDeclinePressed ? styles.btnPressed : styles.btnOutline]}
          onPress={handleDeclinePress}
        >
          <Text style={[styles.btnText, isDeclinePressed ? styles.btnTextPressed : null]}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, isAcceptPressed ? styles.btnPressed : styles.btnOutline]}
          onPress={handleAcceptPress}
        >
          <Text style={[styles.btnText, isAcceptPressed ? styles.btnTextPressed : null]}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    //marginBottom: 10,
    color: ColorPallete.darkBlue
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
  },
  subHeadings: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    color: ColorPallete.darkBlue
  },
  btn: {
    marginLeft: 20,
    width: 100, 
    height: 40, 
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnOutline: {
    borderColor: ColorPallete.darkBlue,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  btnPressed: {
    backgroundColor: ColorPallete.darkBlue,
  },
  btnText: {
    color: ColorPallete.darkBlue,
  },
  btnTextPressed: {
    color: 'white',
  },
});

export default PrivacyAndTerms;
