import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AdminHomebtn from '../../components/AdminHomebtn';
import colorPallete from '../../constants/ColorPallete'
import ImageButton from '../../components/ImageButton';

export default function HomeScreen({navigation}) {

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }
  

    return (

      <ScrollView style={styles.container}> 
        <View style={styles.headerContainer}>
          <View style={styles.headerUpper}>
            <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
            
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.userGreet}>Hi,</Text>
                <Text style={styles.userName}>Admin</Text>
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
              style={{marginRight:4}}
              onPress={switchScreenHandler}
              screen={'DonorDetailsScreen'}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <AdminHomebtn 
              title={'Recipient'} 
              icon={'office-building'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:4}}
              onPress={switchScreenHandler}
              screen={'RecipientDetailsScreen'}
            />
          </View>
        </View>

      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      // paddingTop:48,
      // paddingHorizontal:16,
      backgroundColor:'white'
      
      // borderWidth:1,
      // borderColor:'red',
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
    },
    subtitle:{
      fontSize:18,
      fontWeight:'bold',
      marginVertical:16,
      marginHorizontal:3,
    },
    buttonsContainer:{
      marginBottom: 16, 
    },
    
});