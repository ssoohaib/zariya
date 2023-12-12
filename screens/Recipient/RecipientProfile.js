import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import IconButton from '../../components/IconButton';
import ColorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import PressableOption from '../../components/PressableOption';

function RecipientProfile({navigation}) {

  const switchScreen=(screen)=>{
    navigation.navigate(screen)
  }

    return (
      <View style={styles.container}> 
        <StatusBar style='light' />
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Image style={styles.image} source={require('../../assets/images/user2.png')} />
          </View>
          <View style={styles.topRight}>
            <Text style={styles.userName}>Ligma Jones</Text>
            <Text style={styles.subTitle}>Lahore Pakistan</Text>
            <Text style={styles.subTitle}>+92 316 7865421</Text>
          </View>
        </View>
        <View style={styles.bottom}>          
          <PressableOption 
            title={'Edit Profile'}
            leftIcon={"edit"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'EditProfile'}
          />
          <PressableOption 
            title={'Update Password'}
            leftIcon={"lock"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'UpdatePassword'}
          />
          <PressableOption 
            title={'Feedback & Support'}
            leftIcon={"feedback"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'Feedback'}
          />
          <PressableOption 
            title={'Verification'}
            leftIcon={"verified"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'Verification'}
          />
          <PressableOption 
            title={'Privacy & Terms'}
            leftIcon={"privacy-tip"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'PrivacyAndTerms'}
          />
          <PressableOption 
            title={'Logout'}
            titleColor={'red'}
            leftIcon={"logout"}
            leftIconColor={'red'}
            rightIcon={"keyboard-arrow-right"}
            rightIconColor={'red'}
          />
        </View>
      </View>
    );
}

export default RecipientProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:ColorPallete.screenBg,


    },
    top:{
      flex:0.6,
      paddingHorizontal:16,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:ColorPallete.mediumBlue,

      // borderWidth:1,
      // borderColor:'red',

    },
    topLeft:{
      marginRight:16,

    },
    image:{
      height:85,
      width:85,
      borderRadius:8,
      
    },
    topRight:{
      
    },
    userName:{
      fontSize:20,
      fontWeight:'bold',
      marginBottom:4,
      color:'white',
      fontWeight:'bold',   

    },
    subTitle:{
      color:ColorPallete.screenBgTwo,
      fontWeight:'bold',
      marginBottom:4,
    },



    bottom:{
      borderTopLeftRadius:16,
      borderTopRightRadius:16,
      flex:1,
      position:'relative',
      top:-24,
      backgroundColor:ColorPallete.screenBg,
      paddingHorizontal:16,
      paddingTop:24,

      // borderWidth:1,
      // borderColor:'red',

    },
});