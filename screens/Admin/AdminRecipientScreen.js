import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AdminIconButton from '../../components/AdminIconButton';
import colorPallete from '../../constants/ColorPallete'
import ImageButton from '../../components/ImageButton';

export default function AdminRecipientScreen({navigation}) {

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }
    return (

      <ScrollView style={styles.container}> 
        

        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Actions</Text>
          <View style={styles.buttonsContainer}>
            <AdminIconButton 
              title={'Search Recipients'} 
              icon={'magnify'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:4}}
              onPress={switchScreenHandler}
              screen={'SearchRecipientScreen'}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <AdminIconButton 
              title={'Recipient Requests'} 
              icon={'account-check'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:4}}
              onPress={switchScreenHandler}
              screen={'RecipientRequestScreen'}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <AdminIconButton 
              title={'Recipient Feedbacks'} 
              icon={'message-alert'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:4}}
              onPress={switchScreenHandler}
              screen={'FeedbackScreen'}
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
      flexDirection:'row',
      marginBottom: 16, 
      

    },
    
});