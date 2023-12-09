import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import ColorPallete from '../../constants/ColorPallete';
import AcceptDonationBtn from '../../components/AcceptDonationBtn';

export default function EditProfile() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

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

  const handleSavePress = () => {
    if (email || phoneNumber || location) {
      Alert.alert('Success', 'Your profile has been updated successfully');
    } else {
      Alert.alert('Sorry', 'You have not filled any field');
    }
  };

    return (
      <View style={styles.container}>
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
            style={styles.input}
            placeholder="abc@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+92 609 456 567 4"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}  
          />
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
          <AcceptDonationBtn onPress={handleSavePress}>Save</AcceptDonationBtn>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    imgContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    img: {
      marginTop: 50,
      borderRadius: 100,
      height: 200,
      width: 200,
    },
    iconContainer: {
      position: 'absolute',
      top: 60,
      zIndex: 1,
      right: 100,
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
        height: 40,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16,
    },
    mailContainer: {
      marginTop: 30,
      
    },
    phoneContainer: {
      marginTop: 10,
      
    },
    locContainer: {
      marginTop: 10,
    },
    title: {
      marginLeft: 20,
      color: '#B2B0AF',
    },
    btnContainer: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 30,
    }
});
