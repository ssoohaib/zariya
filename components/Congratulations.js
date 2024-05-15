import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { acceptDonation } from '../utilities/RecipientFetches';

function Congratulations({route}) {

  const {currentUser}=useContext(AuthContext)
  // console.log(route.params)
  // console.log(currentUser)

  
  // Api call

  const payLoad={
    _id:route.params.donationId,
    riderName: route.params.riderName,
    riderContact: route.params.riderContact,

    ngoId: currentUser._id,
    ngoName:currentUser.title,
    ngoEmail:currentUser.email,
    ngoContactNumber:currentUser.contactNumber,
    donationStatus:'Complete'
  }

  
  console.log(payLoad)

  useEffect(()=>{
    const acceptDonationHandler = async () => {
      try {
        const data = await acceptDonation(currentUser._id, payLoad);
        console.log('Donation Accepted');
      } catch (error) {
        console.log(error);
      }
    }

    acceptDonationHandler();
  },[])

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="party-popper" size={100} color={ColorPallete.darkBlue} />
      <Text style={styles.congratulationsText}>Congratulations!</Text>
      <Text style={styles.messageText}>You have accepted the request</Text>
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorPallete.darkBlue,
    marginTop: 20,
  },
  messageText: {
    fontSize: 18,
    color: ColorPallete.darkBlue,
    marginTop: 10,
    textAlign: 'center',
  },
});


