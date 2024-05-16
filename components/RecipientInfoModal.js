
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ColorPallete from '../constants/ColorPallete';
import IconButton from './IconButton';
import { NGOS } from '../dummy_data/dummy_data';

export default function RecipientInfoModal(props) {

  const { isModalVisible, toggleModal, ngo } = props;

  const selectedRecipient = NGOS.find((i)=>i.id==props.id)

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
    Linking.openURL(`mailto:${ngo.email}`);
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
            source={{ uri: props.userData.logo }}
            resizeMode="cover"
          />
          <View style={styles.overlayContainer}>
            <Text style={styles.nameContainer}>{props.userData.title}</Text>
            {/* <Text style={styles.textContainer}>{props.userData.description.slice(0,200)}...</Text> */}
            <View style={{alignItems:"center", marginTop:8}}>
              <Text style={[styles.textContainer, { borderRadius:8, padding:4, paddingHorizontal:8, backgroundColor:ColorPallete.lightBlue, color:ColorPallete.darkBlue, fontWeight:'bold'}]}>{props.userData.recipientApproval}</Text>
            </View>
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
                  title={'Documents'}
                  icon={'file-document'}
                  bgColor={colorPallete.lightBlue}
                  iconColor={colorPallete.darkBlue}
                  style={{ marginRight: 4 }}
                  onPress={handleContactPress}
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
    fontSize: 15,
    fontWeight:'300',
    textAlign:'center',
    color:'white',
    lineHeight:20,
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
    marginTop: 20,
    justifyContent: 'space-between',
},
});
