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
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subHeadings}>1. Terms</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        <Text style={styles.subHeadings}>2. Security</Text>
        <Text style={styles.text}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.subHeadings}>3. Privacy</Text>
        <Text style={styles.text}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.subHeadings}>4. Data</Text>
        <Text style={styles.text}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.subHeadings}>5. Collection</Text>
        <Text style={styles.text}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.subHeadings}>6. Usage</Text>
        <Text style={styles.text}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <View style={{height:32}}></View>
      </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: ColorPallete.screenBg,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    //marginBottom: 10,
    color: ColorPallete.darkBlue
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
    fontSize: 16,
    marginVertical:8,
    // marginTop: 20,
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
