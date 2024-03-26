import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AdminHomebtn from '../../components/AdminHomebtn';
import AdminHomebtnReport from '../../components/AdminHomebtnReport';
import colorPallete from '../../constants/ColorPallete'
import ImageButton from '../../components/ImageButton';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { getAllUsers } from '../../utilities/AuthFetches';
import HorizontalBarGraph from '../../components/HorizontalBarGraph';
import HorizontalBarGraph2 from '../../components/HorizontalBarGraph';
import { useState, useEffect } from 'react';

export default function HomeScreen({navigation}) {
  const {currentUser, token, setAllUsersHandler} = useContext(AuthContext);

  const [donorsCount, setDonorsCount] = useState(0);
  const [recipientsCount, setRecipientsCount] = useState(0);
  const [mostDonationsDonor, setMostDonationsDonor] = useState(null);
  const [mostDonationsNGO, setMostDonationsNGO] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalSubscribedUsers, setTotalSubscribedUsers] = useState(0);
  const [mostRepeatedCause, setMostRepeatedCause] = useState('');

  const maxValue = Math.max(donorsCount, recipientsCount);
  const maxValue2 = Math.max(totalDonations);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(token);
        setAllUsersHandler(allUsers);

        const donors = allUsers.filter(user => user.userType === 'donor');
        const recipients = allUsers.filter(user => user.userType === 'recipient');
        setDonorsCount(donors.length);
        setRecipientsCount(recipients.length);

        let maxDonations = 0;
        let donorWithMostDonations = null;
        donors.forEach(donor => {
          if (donor.donationsMade.length > maxDonations) {
            maxDonations = donor.donationsMade.length;
            donorWithMostDonations = donor;
          }
        });
        setMostDonationsDonor(donorWithMostDonations);

        let maxDonationsNGO = 0;
        let ngoWithMostDonations = null;
        allUsers.forEach(user => {
          if (user.userType === 'recipient' && user.donationsReceived.length > maxDonationsNGO) {
            maxDonationsNGO = user.donationsReceived.length;
            ngoWithMostDonations = user;
          }

          // Calculate total donations
        const total = allUsers.reduce((acc, user) => acc + user.donationsMade.length, 0);
        setTotalDonations(total);

        // Calculate total subscribed users
        const subscribedUsersCount = allUsers.reduce((acc, user) => acc + user.subscribedUsers.length, 0);
        setTotalSubscribedUsers(subscribedUsersCount);

        });
        setMostDonationsNGO(ngoWithMostDonations);


        // Calculate most repeated cause
        let causeCount = {};
        allUsers.forEach(user => {
          user.subscribedUsers.forEach(subscribedNgo => {
            subscribedNgo.causes.forEach(cause => {
              causeCount[cause] = (causeCount[cause] || 0) + 1;
            });
          });
        });
        const mostRepeated = Object.keys(causeCount).reduce((a, b) => causeCount[a] > causeCount[b] ? a : b);
        setMostRepeatedCause(mostRepeated);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token, setAllUsersHandler]);
  
  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }
  const allUsers = getAllUsers(token);
  const getAllUsersHandler= async (screen)=>{
    console.log("getting all users")
    const allUsers = await getAllUsers(token);
    setAllUsersHandler(allUsers);
    console.log("all users")
    switchScreenHandler(screen)
  }

    return (

      <ScrollView style={styles.container}> 
        <View style={styles.headerContainer}>
          <View style={styles.headerUpper}>
            <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
            
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.userGreet}>Hi,</Text>
                <Text style={styles.userName}>{currentUser.firstName} {currentUser.lastName}</Text>
              </View>
              <ImageButton
                style={styles.userImage}
                onPress={switchScreenHandler}
                screen={'Profile'}
              />
            </View>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Manage Users</Text>
          <View style={styles.buttonsContainer}>
            <AdminHomebtn 
              title={'Donor'} 
              icon={'account-multiple'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:8}}
              onPress={getAllUsersHandler}
              screen={'SearchDonorScreen'}
            />
            <AdminHomebtn 
              title={'Recipient'} 
              icon={'office-building'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:0}}
              onPress={getAllUsersHandler}
              screen={'RecipientDetailsScreen'}
            />
          </View>
          <Text style={styles.subtitle}>Reports and Analytics</Text>
          <HorizontalBarGraph
              data={[donorsCount, recipientsCount]}
              labels={['Total Donors', 'Total Recipients']}
              maxValue = {maxValue}
            />

          <View style={styles.lineSeparator} /> 

            <HorizontalBarGraph
              data={[totalDonations]} 
              labels={['Non Monetary Donations']} 
              maxValue={maxValue2}
            />

            <HorizontalBarGraph
                data={[totalSubscribedUsers]} 
                labels={['Monetary Donations']} 
                maxValue={maxValue2}
              />

            <View style={styles.lineSeparator} />

            {mostDonationsDonor && (
              <View style={styles.mostDonationsContainer}>
                <Text style={styles.mostDonationsText}>Top Donor: </Text>
                <Text style={styles.mostDonationsName}>{mostDonationsDonor.firstName} {mostDonationsDonor.lastName}</Text>
              </View>
            )}
            {mostDonationsNGO && (
          <View style={styles.mostDonationsContainer}>
            <Text style={styles.mostDonationsText}>Top NGO: </Text>
            <Text style={styles.mostDonationsName}>{mostDonationsNGO.title}</Text>
          </View>
            )}

            <View style={styles.mostDonationsContainerx}>
            <Text style={styles.subtitle}>Top Supported Cause: </Text>
            <Text style={styles.mostDonationsName}>{mostRepeatedCause}</Text>
            </View>
           
        </View>

        

          
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white'
    },
    mostDonationsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    mostDonationsContainerx: {
      flexDirection: 'row',
      alignItems: 'center',
      bottom: 10,
      right: 3
    },
    mostDonationsText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    mostDonationsName: {
      fontSize: 16,
    },
    buttonsContainerx: {
      marginTop: 230,
    },
    lineSeparator:{
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      marginVertical: 10, 
    },
    headerContainer:{
      // paddingVertical:48,
      paddingTop:48,
      paddingBottom:32,
      paddingHorizontal:16,
      backgroundColor:colorPallete.mediumBlue,
      borderBottomStartRadius:16,
      borderBottomEndRadius:16,
    },
    headerUpper:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',

      // borderWidth:1,
      // borderColor:'red',
    },
    logo:{
      width:70,
      height:'100%',

      // borderWidth:1,
      // borderColor:'red',

    },
    userContainer:{
      flexDirection:"row",


    },
    userTextContainer:{
      marginRight:8,
      justifyContent:'center',

    },
    userGreet:{
      color:colorPallete.screenBg,
      textAlign:'right',

    },
    userName:{
      fontSize:16,
      fontWeight:'bold',
      color:colorPallete.screenBg,

    },
    userImage:{
      height:40,
      width:40,
      borderRadius:20,
      borderWidth:4,
      borderColor:colorPallete.lightBlue,

    },

    categoryContainer:{
      paddingHorizontal:16,
      //justifyContent:'space-between',
    },
    graphpicture:{
      height:230,
      width:'100%',
      borderWidth: 0.5, // Border width
      borderColor: 'grey', // Border color
      borderRadius: 10, 
    },

    subtitle:{
      fontSize:18,
      fontWeight:'bold',
      marginVertical:16,
      marginHorizontal:3,
    },
    buttonsContainer:{ 
      flexDirection:'row',
      justifyContent:'space-between',
    },
    
});