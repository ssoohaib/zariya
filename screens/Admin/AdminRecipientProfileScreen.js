import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList, Linking, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ColorPallete from '../../constants/ColorPallete';
import DonationsRecievedCard from '../../components/DonationsRecievedCard'
import SubedUsersCard from '../../components/SubedUsersCard';
import { AuthContext } from '../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import HorizontalBarGraph from '../../components/HorizontalBarGraph'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminRecipientProfileScreen({ route }) {
  const { allUsers } = useContext(AuthContext);
  const currentUser = allUsers.filter(item => item._id === route.params.id);
  const { title, email, contactNumber, donationsReceived, subscribedUsers, causesImages } = currentUser[0];
  const [freezeAccount, setFreezeAccount] = useState(currentUser[0].freezeAccount);

  const [activeButton, setActiveButton] = useState('Donations');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDonations, setShowDonations] = useState(true); // State to track which list to show

  const [donationsCount, setDonationsCount] = useState(0);
  const [subscribedNgosCount, setSubscribedNgosCount] = useState(0);
  const [causeCounts, setCauseCounts] = useState({});

  useEffect(() => {
    setDonationsCount(donationsReceived.length);
    setSubscribedNgosCount(subscribedUsers.length);

    // Count the occurrences of each cause
    const counts = {};
    subscribedUsers.forEach(ngo => {
      ngo.causes.forEach(cause => {
        counts[cause] = (counts[cause] || 0) + 1;
      });
    });
    setCauseCounts(counts);
  }, [donationsReceived, subscribedUsers]);

  const maxValue = Math.max(donationsCount, subscribedNgosCount, ...Object.values(causeCounts));



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
              setFreezeAccount(false);
            },
          },
        ],
        { cancelable: true }
      );
    }
    else{
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
              setFreezeAccount(true);
            },
          },
        ],
        { cancelable: true }
      );
    }

  };

  const handleProfilePress = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  const renderDonations = itemData => {
    return (
      <DonationsRecievedCard
        id={itemData.item.id}
        donorId={itemData.item.donorId}
        donorName={itemData.item.donorName}
        category={itemData.item.donationCategory}
        status={itemData.item.donationStatus}
        date={itemData.item.donationDate}
      />
    );
  };

  const rendersubNgos = itemData => {
    return (
      <SubedUsersCard
        id={itemData.item.id}
        donorName={itemData.item.donorName}
        causes={itemData.item.causes}
        date={itemData.item.subscriptionDate}
        amount={itemData.item.amount}
        duration={itemData.item.duration}
        subscriptionStatus={itemData.item.subscriptionStatus}
      />
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[ColorPallete.darkBlue, 'white']} style={styles.DonorDetails}>
        <View style={styles.innercontainer}>
          <Image source={{ uri: causesImages[0] }} style={styles.image} />
          <View style={styles.DonorContactDetails}>
            <Text style={styles.donorName}>{title}</Text>
            {freezeAccount && <Text style={styles.accountStatus}>(Account Frozen)</Text>}
          </View>
          <View style={styles.buttonsContainerx}>
            <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
              <Text style={styles.buttonText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.idButton} onPress={handleProfilePress}>
              <MaterialIcons name="article" size={24} color={ColorPallete.darkBlue} />
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
              <Text style={[styles.buttonText, activeButton === 'Subscribed' && styles.activeButtonText]}>Subscribed Users</Text>
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
            data={donationsReceived}
            renderItem={renderDonations}
            showsVerticalScrollIndicator={true}
          />
        )}
        {activeButton === 'Subscribed' && (
          <FlatList
            data={subscribedUsers}
            renderItem={rendersubNgos}
            showsVerticalScrollIndicator={true}
          />
        )}
        {activeButton === 'Analytics' && (
          <View style={styles.analyticsContainer}>
            <Text style={styles.generalText}>General</Text>
            <HorizontalBarGraph
              data={[donationsCount, subscribedNgosCount]}
              labels={['Donations Recieved', 'Subscribed Users']}
              maxValue = {maxValue}
            />
             <Text style={styles.generalText}>Causes Supported</Text>
            <HorizontalBarGraph
              data={Object.values(causeCounts)}
              labels={Object.keys(causeCounts)}
              maxValue = {maxValue}
            />
          </View>
        )}
      </View>
      {/* Profile Modal */}
      <Modal visible={showProfileModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <MaterialIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Swiper style={styles.wrapper} showsButtons={true}>
            {causesImages.map((causesImages, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: causesImages }} style={styles.profilePhoto} />
              </View>
            ))}
          </Swiper>
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: ColorPallete.darkBlue,
    fontWeight: 'bold',
  },
  DonorDetails: {
    width: '100%',
    height: '38%',
    alignItems: 'center',
  },
  additionalView: {
    flex: 1,
    marginTop: 58
  },
  DonorContactDetails: {
    alignItems: 'center',
    marginTop: 130
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
    height: '31%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
  },
  toggleButton: {
    borderWidth: 1.5,
    borderColor: ColorPallete.darkBlue,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 9,
    marginHorizontal: 3,
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
  activeButton: {
    backgroundColor: ColorPallete.darkBlue,
  },
  activeButtonText: {
    color: 'white',
  },
  buttonsContainerx: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountStatus: {
    fontSize: 16,
    color: 'red', 
  },
});
