import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ColorPallete from '../constants/ColorPallete';
import IconButton from './IconButton';

export default function DonorInfoModal(props) {

  const { isModalVisible, toggleModal, donorfb } = props;

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={toggleModal}
    >
      {donorfb && (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: donorfb.images[0] }}
            resizeMode="cover"
          />
          <View style={styles.overlayContainer}>
            <Text style={styles.nameContainer}>{donorfb.name.toUpperCase()} writes</Text>
            <Text style={styles.textContainer}>{donorfb.desc}</Text>
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
    width: 100,
    height: 100,
    borderRadius: 60,
    alignSelf:'baseline',
    marginTop:20,
    position:'absolute'
},
  overlayContainer:{
      marginLeft:60,
      marginTop:57,
      textAlign: 'center',

  },
  textContainer: {
    fontSize: 15,
    textAlign:'auto',
    color:'white',
    lineHeight:18,
    marginTop:50,
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
