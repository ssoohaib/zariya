import React, { useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TextInput, Alert, ScrollView } from 'react-native';
import ColorPallete from '../../constants/ColorPallete';
import AcceptDonationBtn from '../../components/AcceptDonationBtn';
import { AuthContext } from '../../context/AuthContext';

export default function DonorEditProfile() {
  const {currentUser}=useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  console.log(currentUser)

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setPhoneNumber(currentUser.contactNumber);
      setLocation(currentUser.city);
    }
  }
  , []);

  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+?\d{1,4}?[-. ]?\d{6,}$/;
    return regex.test(phoneNumber);
  };

  const handleSavePress = () => {
    let hasError = false;
  
    // Validate email
    if (email && !validateEmail(email)) {
      setEmailError('Invalid email format');
      hasError = true;
    } else {
      setEmailError(null);
    }
  
    // Validate phone number
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setPhoneError('Invalid phone number');
      hasError = true;
    } else {
      setPhoneError(null);
    }
  
    if (!email && !phoneNumber && !location) {
      setEmailError('Field is empty');
      setPhoneError('Field is empty');
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
    Alert.alert('Success', 'Your profile has been updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconContainer} onTouchEnd={handleChoosePhoto}>
        <Ionicons style={styles.icon} name="ios-camera-outline" size={24} color="white" />
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={image ? { uri: image } :
          require('../../assets/images/user2.png')} />
      </View>
      <View style={styles.mailContainer}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={[styles.input, emailError && { borderColor: 'red' }]}
          placeholder="abc@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(null); 
          }}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.title}>Phone Number</Text>
        <TextInput
          style={[styles.input, phoneError && { borderColor: 'red' }]}
          placeholder="+92 609 456 567 4"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            setPhoneError(null); 
          }}
        />
        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.title}>New Password</Text>
        <TextInput
          style={[styles.input, phoneError && { borderColor: 'red' }]}
          placeholder="+92 609 456 567 4"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            setPhoneError(null); 
          }}
        />
        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
      </View>
      <View style={styles.locContainer}>
        <Text style={styles.title}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="XXXX Twin Willow Lane, City"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>
      <View style={styles.btnContainer}>
        <AcceptDonationBtn onPress={handleSavePress}>Update</AcceptDonationBtn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'relative',
  },
  img: {
    // marginTop: 50,
    borderRadius: 100,
    height: 150,
    width: 150,
  },
  iconContainer: {
    position: 'absolute',
    // top: -80,
    zIndex: 879898989,
    right: 90,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: ColorPallete.darkBlue,
  },
  icon: {
    padding: 10,
  },
  input: {
    // height: 40,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    // marginBottom: 16,
    // paddingLeft: 8,
    padding: 16,
    borderRadius: 8,
    // marginLeft: 16,
    // marginRight: 16,
  },
  mailContainer: {
    marginTop: 16,

  },
  phoneContainer: {
    marginTop: 16,

  },
  locContainer: {
    marginTop: 16,
  },
  title: {
    // marginLeft: 20,
    marginBottom: 8,
    color: '#B2B0AF',
  },
  btnContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    marginLeft: 16,
    //marginTop: 3,
  },
});
