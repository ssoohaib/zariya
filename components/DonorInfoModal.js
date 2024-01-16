import React, { useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ColorPallete from '../constants/ColorPallete';
import IconButton from './IconButton';
import { Donors } from '../dummy_data/donor_data';


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
      {(
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
            resizeMode="cover"
          />
          <View style={styles.overlayContainer}>
            <Text style={[styles.nameContainer,]}>{props.userData.firstName} {props.userData.lastName}</Text>
            <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:"center"}}>
              <Text style={[styles.textContainer,]}>{props.userData.email}</Text>
              <Text style={[styles.textContainer, {padding:8, color:ColorPallete.mediumBlue, backgroundColor:ColorPallete.lightBlue, borderRadius:8}]}>{props.userData.status}</Text>
            </View>
            <Text style={[styles.textContainer, {fontWeight:'normal'}]}>{props.userData.contactNumber}</Text>
          </View>
          <View style={styles.bottomContainer}>
                <IconButton
                    title={'Suspend'}
                    icon={'account-clock'}
                    bgColor={colorPallete.lightBlue}
                    iconColor={colorPallete.darkBlue}
                    style={{ marginRight: 4, }}
                    onPress={handleContactPress} 
                  />
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
    paddingTop: 16,
    paddingHorizontal: 16,
    top: '38%',
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor:colorPallete.mediumBlue,
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    objectFit: 'contain',
    // position: 'absolute',
    // top:-10,
  },
  overlayContainer:{
      marginTop:16,
      // textAlign: 'center',

  },
  textContainer: {
    fontSize: 16,
    fontWeight:'bold',
    // textAlign:'center',
    color:'white',
    // lineHeight:40,
  },
  nameContainer: {
    fontSize: 20,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    marginBottom:8,
    // fontStyle:'italic'
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
},
});
