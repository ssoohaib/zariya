import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from "../../context/AuthContext";
import {setDataForUpdate} from "../../utilities/RecipientFetches"

export default function EditProfile() {
  const { currentUser } = useContext(AuthContext); 
  const [changes, setChanges] = useState({
    email: '',
    description: '',
    phoneNumber: '',
    location: '',
    causes: [],
    pictures: [],
  });
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [newCause, setNewCause] = useState('');

  const { email, description, phoneNumber, location, causes, pictures } = changes;

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    return /^\+92\d{10}$/.test(phoneNumber);
  };

  const handleSavePress = async () => {
    let isValid = true;
  
    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if (!isPhoneNumberValid(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number starting with +92.');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }
  
    if (isValid) {
      let payload = {
        userType: "recipient",
        id: currentUser._id,
        email: email,
        description: description,
        contactNumber: phoneNumber,
        city: location,
        causes: causes,
        causesImages: pictures,
      };
      
      setDataForUpdate({ ...payload });
    }
  };
  
  
  useEffect(() => {
    // Request permission to access the device's gallery
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleAddPicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        if (pictures.length < 3) {
          setChanges({ ...changes, pictures: [...pictures, result.uri] });
        } else {
          Alert.alert('Limit Exceeded', 'You can only add up to three images.');
        }
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
    }
  };

  const handleDeletePicture = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setChanges({ ...changes, pictures: updatedPictures });
  };

  const handleAddCause = () => {
    if (newCause.trim() !== '') {
      setChanges({ ...changes, causes: [...causes, newCause.trim()] });
      setNewCause('');
    }
  };

  const handleRemoveCause = (index) => {
    const updatedCauses = causes.filter((_, i) => i !== index);
    setChanges({ ...changes, causes: updatedCauses });
  };

  

  const handleUndoPress = () => {
    // Reset changes logic here
    setChanges({
      email: '',
      description: '',
      phoneNumber: '',
      location: '',
      causes: [],
      pictures: [],
    });
    Alert.alert('Undo', 'All changes have been undone');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="abc@gmail.com"
          value={email}
          onChangeText={(text) => setChanges({ ...changes, email: text })}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter new description"
          value={description}
          onChangeText={(text) => setChanges({ ...changes, description: text })}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Contact Number</Text>
        <TextInput
          style={[styles.input, phoneNumberError ? styles.errorInput : null]}
          placeholder="+92 303 6547839"
          value={phoneNumber}
          onChangeText={(text) => setChanges({ ...changes, phoneNumber: text })}
          keyboardType="phone-pad"
        />
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Lahore"
          value={location}
          onChangeText={(text) => setChanges({ ...changes, location: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Causes</Text>
        <View style={styles.addCauseContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new cause"
            value={newCause}
            onChangeText={(text) => setNewCause(text)}
            onSubmitEditing={handleAddCause}
          />
          <TouchableOpacity onPress={handleAddCause}>
            <Ionicons name="add-circle" size={30} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.causesContainer}>
          {causes.map((cause, index) => (
            <View key={index} style={styles.causeItem}>
              <Text>{cause}</Text>
              <TouchableOpacity onPress={() => handleRemoveCause(index)}>
                <Ionicons name="close-circle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Pictures</Text>
        <View style={styles.picturesContainer}>
          {pictures.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => handleDeletePicture(index)} style={styles.pictureWrapper}>
              <Image source={{ uri }} style={styles.pictureItem} />
              <TouchableOpacity onPress={() => handleDeletePicture(index)} style={styles.deleteIcon}>
                <Ionicons name="trash-bin" size={20} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          {pictures.length < 3 && (
            <TouchableOpacity onPress={handleAddPicture} style={[styles.pictureWrapper, styles.addPictureWrapper]}>
              <Ionicons name="add-circle" size={50} color="green" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleUndoPress} style={[styles.undoButton, styles.button]}>
            <Text style={[styles.buttonText, { color: ColorPallete.mediumBlue }]}>Undo Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSavePress} style={[styles.saveButton, styles.button]}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    flex: 1, // Take up remaining space
    height: 40,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginRight: 10, // Add margin to the right
  },
  title: {
    marginBottom: 5,
    color: '#B2B0AF',
  },
  multilineInput: {
    height: 80,
    paddingTop: 8, // Adjust padding for multiline input
  },
  causesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  causeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#453953',
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  addCauseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  picturesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  pictureWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  pictureItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addPictureWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderStyle: 'dashed',
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 2,
  },
  btnContainer: {
    marginTop: 20,
    //alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: ColorPallete.mediumBlue,
  },
  undoButton: {
    borderColor: ColorPallete.mediumBlue,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red', 
    marginTop: 5, 
  },
});