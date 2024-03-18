import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList, Linking, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ColorPallete from '../../constants/ColorPallete';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminRecipientProfileScreen({ route }) {
  const { id, firstName, lastName, photo, email, contactNumber, donationsMade } = route.params;
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleContactPress = () => {
    Alert.alert(
      'Contact',
      'Choose an option to contact the donor:',
      [
        {
          text: 'Phone Call',
          onPress: () => {
            // Open phone dialer
            Linking.openURL(`tel:${contactNumber}`);
          },
        },
        {
          text: 'Email',
          onPress: () => {
            // Open email app
            Linking.openURL(`mailto:${email}`);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { 
        cancelable: true,
        contentContainerStyle: { 
          flexDirection: 'column' 
        }
      }
    );
  };

  const handleProfilePress = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    console.log('Donation Made:', donationsMade);
  });

  const renderDonations = ({ item }) => (
    <DonationsCard
      id={item.id}
      ngoID={item.ngoId}
      ngoName={item.ngoName}
      category={item.donationCategory}
      status={item.donationStatus}
      date={item.donationDate}
    />
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[ColorPallete.darkBlue, 'white']}
        style={styles.DonorDetails}>
          <View style={styles.innercontainer}>
            <Image source={{ uri: photo }} style={styles.image} />
            <View style={styles.DonorContactDetails}>
              <Text style={styles.donorName}>{firstName} {lastName}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
                <Text style={styles.buttonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.idButton} onPress={handleProfilePress}>
                <MaterialIcons name="article" size={24} color={ColorPallete.darkBlue} />
              </TouchableOpacity>
            </View>
          </View>
      </LinearGradient>
      <View style={styles.additionalView}>
        <Text style={{fontWeight: 'bold', fontSize: 18, margin: 15, color: ColorPallete.darkBlue}}>Donations Made</Text>
        <FlatList
          data={donationsMade}
          renderItem={renderDonations}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
        />
      </View>
      {/* Profile Modal */}
      <Modal visible={showProfileModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <MaterialIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: photo }} style={styles.profilePhoto} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innercontainer:{
    marginTop: 10,
    alignItems: 'center'
  },
  contactButton: {
    marginTop: 10,
    width: 125,
    borderRadius: 10,
    backgroundColor: ColorPallete.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  idButton: {
    marginTop: 10,
    marginLeft: 10,
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: ColorPallete.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: ColorPallete.darkBlue,
    fontWeight: 'bold'
  },
  DonorDetails: {
    width: '100%',
    height: '38%',
    alignItems: 'center',
  },
  additionalView: {
    width: '100%',
    height: '100%',
    borderWidth: 2
  },
  DonorContactDetails: {
    alignItems: 'center',
    marginTop: 130
  },
  image: {
    width: '32%',
    height: '52%',
    resizeMode: 'cover',
    borderRadius: 100,
    position: 'absolute',
    marginTop: 10
  },
  profilePhoto: {
    width: '90%',
    height: '35%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  donorName:{
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
  },
});
