
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
      {selectedRecipient && (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: selectedRecipient.images[0] }}
            resizeMode="cover"
          />
          <View style={styles.overlayContainer}>
            <Text style={styles.nameContainer}>{selectedRecipient.title.toUpperCase()}</Text>
            <Text style={styles.textContainer}>{selectedRecipient.desc.slice(0,250)}</Text>
            <View style={styles.btmContainer}>
              <View>
                <Text style={styles.contactContainer}>☎ {selectedRecipient.contact.phone}</Text>
                <Text style={styles.contactContainer}>📍 {selectedRecipient.contact.city}, {selectedRecipient.contact.country}</Text>
                <IconButton
                  title={'Documents'}
                  icon={'file-document'}
                  bgColor={colorPallete.lightBlue}
                  iconColor={colorPallete.darkBlue}
                  style={{ marginLeft: 5, top: 10, padding: 5 }}
                  onPress={handleContactPress}
                />
              </View>
                <Text style={styles.causesContainer}>
                  Causes:
                  {selectedRecipient.causes.map((cause, index) => (
                    <Text key={index}>{'\n'}{cause}</Text>
                  ))}
                </Text>
                
            </View>
          </View>
          <View style={styles.bottomContainer}>
                
              <IconButton
                  title={'Accept'}
                  icon={'check'}
                  bgColor={colorPallete.lightBlue}
                  iconColor={colorPallete.darkBlue}
                  style={{ marginRight: 4 }}
                  onPress={handleRemovePress}
                />
                
                <IconButton
                  title={'Reject'}
                  icon={'cancel'}
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
    //backgroundColor:colorPallete.mediumBlue,
    backgroundColor:'white',
    borderRadius: 16,
    paddingTop: 8,
    paddingHorizontal: 16,
    top: '15%',
    margin: 0,
  },
  container: {
    flex: 1,
    //backgroundColor:colorPallete.mediumBlue,
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
    fontWeight:'400',
    color:'white',
    lineHeight:20,
    color:'black',
    borderColor:'black'
  },
  nameContainer: {
    fontSize: 30,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontStyle:'italic',
    color:'black'
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
},
causesContainer:{
  fontSize: 20,
  color:'white',
  textAlign:'center',
  lineHeight:20,
  marginTop:10,
  marginLeft:20,
  borderWidth:1,
  borderRadius:20,
  backgroundColor:colorPallete.mediumBlue,
  padding:10,
  alignSelf: 'flex-start',
},
contactContainer:{
  marginTop:17,
  fontSize: 20,
  color:'white',
  fontWeight:'500',
  fontStyle:'normal',
  color:'black',
  lineHeight:25
},
btmContainer:{
  flexDirection:'row'
}
});
