import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import AcceptDonationBtn from '../../components/AcceptDonationBtn';

export default function Verification() {
  const [image, setImage] = useState(null);

  const handleChoosePhoto = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // Specify the type of documents you want to allow
    });

    if (result.type === 'success') {
      setImage(result.uri);
    } else {
      Alert.alert('Error', 'No document selected.');
    }
  } catch (error) {
    console.error('Error choosing document:', error);
  }
};

  
  

  const handleUpload = () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image before uploading.');
      return;
    }
    Alert.alert('Success', 'Image uploaded successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer} onTouchEnd={handleChoosePhoto}>
        <FontAwesome5 style={styles.icon} name="upload" size={20} color="white" />
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={image ? { uri: image } : 
        require('../../assets/images/upload.png')} />
      </View>
      <Text style={styles.heading}>Upload Documents for Verification</Text>
      <Text style={styles.text}>Please make sure that the documents you are 
      uploading are correct and original.</Text>
      <View style={styles.btnContainer}>
      <AcceptDonationBtn onPress={handleUpload}>Upload</AcceptDonationBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 120,
    zIndex: 1,
    right: 110,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: ColorPallete.darkBlue,
  },
  icon: {
    padding: 12,
  },
  imgContainer: {
    marginTop: 130,
  },
  img: {
    height: 200,
    width: 200,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 40,
  },
  text: {
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 30,
    height: 100,
    width: 300,
  },
});