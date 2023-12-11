import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ColorPallete from '../constants/ColorPallete';
import IconButton from './IconButton';

export default function DonorInfoModal(props) {

  const { isModalVisible, toggleModal, donor } = props;

  const handleRemovePress = () => {
    console.log('remove pressed');
    // Display a confirmation dialog
    Alert.alert(
      'Confirm',
      'Do you want to remove this user?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log('User removed!');
            toggleModal();
          },
        },
      ],
      { cancelable: false }
    );
    
  };

  const handleContactPress = () => {
    console.log('remove pressed');
    // Open the default email app with a pre-filled email
    Linking.openURL(`mailto:${donor.email}`);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={toggleModal}
    >
      {donor && (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: donor.images[0] }}
            resizeMode="cover"
          />
          <View style={styles.overlayContainer}>
            <Text style={styles.nameContainer}>{donor.name.toUpperCase()}</Text>
            <Text style={styles.textContainer}>✉ {donor.email}</Text>
            <Text style={styles.textContainer}>☎ {donor.contact.phone}</Text>
            <Text style={styles.textContainer}>👤 {donor.status}</Text>
          </View>
          <View style={styles.bottomContainer}>
              <IconButton
                  title={'Remove'}
                  icon={'account-minus'}
                  bgColor={colorPallete.lightBlue}
                  iconColor={colorPallete.darkBlue}
                  style={{ marginRight: 4 }}
                  onPress={handleRemovePress}
                />
                <IconButton
                  title={'Contact'}
                  icon={'gmail'}
                  bgColor={colorPallete.lightBlue}
                  iconColor={colorPallete.darkBlue}
                  style={{ marginRight: 4 }}
                  onPress={handleContactPress}
                  
                />
          </View>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor:colorPallete.mediumBlue,
    borderRadius: 16,
    paddingTop: 8,
    paddingHorizontal: 16,
    top: '32%',
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor:colorPallete.mediumBlue,
    alignItems: 'center',
  },
  image: {
    width: '110%',
    height: '35%',
    borderRadius: 16,
    position: 'absolute',
    top:-10,
  },
  overlayContainer:{
      marginTop:280,
      textAlign: 'center',

  },
  textContainer: {
    fontSize: 20,
    fontWeight:'150',
    textAlign:'center',
    color:'white',
    fontStyle:'',
    lineHeight:40,
  },
  nameContainer: {
    fontSize: 20,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontStyle:'italic'
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
},
});
