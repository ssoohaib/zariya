import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AdminHomebtn from '../../components/AdminHomebtn';
import colorPallete from '../../constants/ColorPallete'
import ImageButton from '../../components/ImageButton';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { getAllUsers } from '../../utilities/AuthFetches';

export default function HomeScreen({navigation}) {
  const {currentUser, token, setAllUsersHandler} = useContext(AuthContext);

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }
  
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
          <TouchableOpacity onPress={() => switchScreenHandler('AdminReportScreen')} style={styles.graphContainer}>
            <Image
              style={styles.graphpicture}
              source={require('../../assets/images/graph.jpg')}
            />
        </TouchableOpacity>
        </View>

      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white'
 
    },

    headerContainer:{
      // paddingVertical:48,
      paddingTop:48,
      paddingBottom:32,
      paddingHorizontal:16,
      backgroundColor:colorPallete.mediumBlue,
      borderBottomStartRadius:16,
      borderBottomEndRadius:16,

      // borderWidth:1,
      // borderColor:'red',
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

      // borderWidth:1
    },
    
});