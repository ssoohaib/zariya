import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList, Linking, Modal, TextInput } from 'react-native';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ColorPallete from '../../constants/ColorPallete';
import DonationsCard from '../../components/DonationsCard';
import SubedNgoCard from '../../components/SubedNgoCard';
import { AuthContext } from '../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import HorizontalBarGraph from '../../components/HorizontalBarGraph'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {toggleFreeze} from '../../utilities/AdminApis'


export default function AdminDonorScreen({ route }) {
  const { allUsers } = useContext(AuthContext);
  const currentUser = allUsers.filter(item => item._id === route.params.id);
  const { firstName, lastName, email, contactNumber, donationsMade, photo, subscribedNgos } = currentUser[0];
  const [freezeAccount, setFreezeAccount] = useState(currentUser[0].recipientApproval);

  const [activeButton, setActiveButton] = useState('Donations');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [donationsCount, setDonationsCount] = useState(0);
  const [subscribedNgosCount, setSubscribedNgosCount] = useState(0);
  const [causeCounts, setCauseCounts] = useState({});

  useEffect(() => {
    setDonationsCount(donationsMade.length);
    setSubscribedNgosCount(subscribedNgos.length);

    // Count the occurrences of each cause
    const counts = {};
    subscribedNgos.forEach(ngo => {
      ngo.causes.forEach(cause => {
        counts[cause] = (counts[cause] || 0) + 1;
      });
    });
    setCauseCounts(counts);
  }, [donationsMade, subscribedNgos]);

  const maxValue = Math.max(donationsCount, subscribedNgosCount, ...Object.values(causeCounts));

  const handleContactPress = () => {
    Alert.alert(
      'Contact',
      'Choose an option to contact the donor:',
      [
        {
          text: 'Phone Call',
          onPress: () => {
            Linking.openURL(`tel:${contactNumber}`);
          },
        },
        {
          text: 'Email',
          onPress: () => {
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

  const handleFreezeAccount = () => {
    if (freezeAccount) {
      Alert.alert(
        'Unfreeze Account',
        'Do you want to unfreeze this user account?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setFreezeAccount(true);

              toggleFreeze(currentUser[0]._id); // Send HTTP request to backend to unfreeze account
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        'Freeze Account',
        'Do you want to freeze this user account?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setFreezeAccount(false);

              toggleFreeze(currentUser[0]._id); // Send HTTP request to backend to freeze account
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  // console.log('Backend URL:', `${connectDB}/users/${currentUser[0]._id}`);

  
  
  const handleProfilePress = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };


  const renderDonations = itemData => {
    return (
      <DonationsCard
        id={itemData.item.id}
        ngoID={itemData.item.ngoId}
        ngoName={itemData.item.ngoName}
        category={itemData.item.donationCategory}
        status={itemData.item.donationStatus}
        date={itemData.item.donationDate}
      />
    );
  };

  const rendersubNgos = itemData => {
    return (
      <SubedNgoCard
        id={itemData.item.id}
        ngoID={itemData.item.ngoId}
        ngoName={itemData.item.ngoName}
        causes={itemData.item.causes}
        date={itemData.item.subscriptionDate}
        duration={itemData.item.duration}
        subscriptionStatus={itemData.item.subscriptionStatus}
      />
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[ColorPallete.darkBlue, 'white']} style={styles.DonorDetails}>
        <View style={styles.innercontainer}>
          <Image source={{ uri: photo }} style={styles.image} />
          <View style={styles.DonorContactDetails}>
            <Text style={styles.donorName}>{firstName} {lastName}</Text>
            {freezeAccount && <Text style={styles.accountStatus}>(Account Frozen)</Text>}
          </View>
          <View style={styles.buttonsContainerx}>
            <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
              <Text style={styles.buttonText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.idButton} onPress={handleFreezeAccount}>
              <MaterialCommunityIcons name="account-clock" size={24} color={ColorPallete.darkBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, activeButton === 'Donations' && styles.activeButton]}
              onPress={() => setActiveButton('Donations')}>
              <Text style={[styles.buttonText, activeButton === 'Donations' && styles.activeButtonText]}>Donations Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeButton === 'Subscribed' && styles.activeButton]}
              onPress={() => setActiveButton('Subscribed')}>
              <Text style={[styles.buttonText, activeButton === 'Subscribed' && styles.activeButtonText]}>Subscribed NGOs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeButton === 'Analytics' && styles.activeButton]}
              onPress={() => setActiveButton('Analytics')}>
              <Text style={[styles.buttonText, activeButton === 'Analytics' && styles.activeButtonText]}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View style={[styles.additionalView, { marginTop: freezeAccount ? 69 : 50 }]}>
        {activeButton === 'Donations' && (
          <FlatList
            data={donationsMade}
            renderItem={renderDonations}
            showsVerticalScrollIndicator={true}
          />
        )}
        {activeButton === 'Subscribed' && (
          <FlatList
            data={subscribedNgos}
            renderItem={rendersubNgos}
            showsVerticalScrollIndicator={true}
          />
        )}
        {activeButton === 'Analytics' && (
          <View style={styles.analyticsContainer}>
            <Text style={styles.generalText}>General</Text>
            <HorizontalBarGraph
              data={[donationsCount, subscribedNgosCount]}
              labels={['Donations Made', 'Subscribed NGOs']}
              maxValue = {maxValue}
            />
             <Text style={styles.generalText}>Causes Supported</Text>
              <HorizontalBarGraph
              data={Object.values(causeCounts)}
              labels={Object.keys
                (causeCounts)}
                maxValue = {maxValue}
              />
            </View>
          )}
        </View>
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
    accountStatus: {
      fontSize: 16,
      color: 'red', 
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
      marginTop: 10,
    },
    buttonsContainerx: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleButton: {
      borderWidth: 1.5,
      borderColor: ColorPallete.darkBlue,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 9,
      marginHorizontal: 3,
    },
    activeButton: {
      backgroundColor: ColorPallete.darkBlue,
    },
    buttonText: {
      fontSize: 16,
      color: ColorPallete.darkBlue,
      fontWeight: 'bold',
    },
    activeButtonText: {
      color: 'white',
    },
    DonorDetails: {
      width: '100%',
      height: '38%',
      alignItems: 'center',
    },
    additionalView: {
      flex: 1,
    },
    DonorContactDetails: {
      alignItems: 'center',
      marginTop: 130,
    },
    image: {
      width: '32%',
      height: '43%',
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
    analyticsContainer: {
      flex: 1,
      margin: 10
    },
    generalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
  });
  