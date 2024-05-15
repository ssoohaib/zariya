import { View, Text, StyleSheet, Image, Modal, TextInput, TouchableOpacity, Pressable } from 'react-native'; // Import Pressable
import { SliderBox } from 'react-native-image-slider-box';
import { useRef } from 'react';
// import AcceptBtn from '../../components/AcceptBtn';
import ColorPallete from '../../constants/ColorPallete';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import Congratulations from '../../components/Congratulations';


function DonationDetail() {
  

  

  const image = [require('../../assets/images/biryani.png')];

  return (
    <View style={styles.container}>
      <View style={styles.backButton}> 
       <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#453953" />
       </Pressable>
       </View>
      <View style={styles.imageContainer}> 
        <Image style={styles.image} source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihawGXqPJmNjYFSc_tqV-P5b35WNCXQzKOMOd1wit-WHdW7T8J8s6MrA-U1Q6Cfd5ES-LXu06qsCFiKFY2sKNqB5zaJZ7lG6UMs=w1919-h910'}} /> 
      </View> 
      <View style={styles.dataContainer}>
        <Text style={styles.data}>800g</Text>
        <Text style={styles.data}>7per</Text>
        <Text style={styles.data}>24hr</Text>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>Weighs</Text>
        <Text style={styles.desc}>Serving</Text>
        <Text style={styles.desc}>Expiry</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>Chicken Biryani</Text>
        <Text style={styles.itemDesc}>Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type specimen book. It
          has survived not only five centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. </Text>
      </View>
      

      
    </View>
  )
}

export default DonationDetail;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  data: {
    fontWeight: 'bold',
    color: ColorPallete.darkBlue,
    textAlign: 'center',
    fontSize: 20,
  },
  descContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  desc: {
    fontWeight: '800',
    fontSize: 15,
    textAlign: 'center',
    color: '#ED986B',
  },
  textContainer: {
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: ColorPallete.darkBlue
  },
  itemDesc: {
    fontWeight: '300',
    fontSize: 14,
    marginTop: 10,
    color: ColorPallete.darkBlue,
  },
  btn: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
  },
  modalContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EFEF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    //marginBottom: 20,
    color: ColorPallete.darkBlue,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 3,
    paddingLeft: 10,
    borderRadius: 8,
    borderColor: '#9F9E9D',
  },
  modalButton: {
    backgroundColor: ColorPallete.darkBlue,
    padding: 10,
    height: 40,
    width: 150,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    color: '#9F9E9D',
    marginBottom: 3,
    marginTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    //marginTop: 3,
  },
  inputErrorText: {
    color: 'red',
    marginTop: 5,
  },
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 70,
    zIndex: 1, // Ensure the icon is rendered above other components
  },
});

