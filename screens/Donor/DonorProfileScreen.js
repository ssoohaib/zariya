import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import PressableOption from '../../components/PressableOption';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import {signOut} from '../../utilities/AuthFetches';

export default function DonorProfileScreen({navigation}) {
  const { token, currentUser, setCurrentUserAndToken }=useContext(AuthContext);

  const switchScreen=(screen)=>{
    navigation.navigate(screen)
  }

  const signOutHandler=()=>{
    signOut(token);
    setCurrentUserAndToken(null, null);
  }

    return (
      <View style={styles.container}> 
        <StatusBar style='light' />
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Image style={styles.image} source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbo-luii4yLWODrM9dmDXGhLjv1lm9NqRDZTDH5WQ0RxIQ_YCuhzNCsolCfb8OadEWRrvxedBSIXSBknwBF1nNdG__RXmzV0w=w1919-h910'}} />
          </View>
          <View style={styles.topRight}>
            <Text style={styles.userName}>{currentUser.firstName} {currentUser.lastName}</Text>
            <Text style={styles.subTitle}>{currentUser.city || 'City'}, Pakistan</Text>
            <Text style={styles.subTitle}>{currentUser.contactNumber || 'Phone'}</Text>
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
            title={'Subscriptions'}
            leftIcon={"subscriptions"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'SubscriptionScreen'}
          />
          <PressableOption 
            title={'Analytics & Reports'}
            leftIcon={"analytics"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'AnalyticsAndReports'}
          />
          {/* <PressableOption 
            title={'Verification'}
            leftIcon={"verified"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'Verification'}
          /> */}
          <PressableOption 
            title={'Support'}
            leftIcon={"support-agent"}
            rightIcon={"keyboard-arrow-right"}
            onPress={switchScreen}
            screen={'DonorSupport'}
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
            onPress={signOutHandler}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:ColorPallete.screenBg,


    },
    top:{
      flex:0.6,
      paddingHorizontal:16,
      // flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:ColorPallete.mediumBlue,

      // borderWidth:1,
      // borderColor:'red',

    },
    topLeft:{
      // marginRight:16,

    },
    image:{
      height:85,
      width:85,
      borderRadius:42,
      
    },
    topRight:{
      
    },
    userName:{
      fontSize:20,
      fontWeight:'bold',
      marginTop:8,
      marginBottom:4,
      color:ColorPallete.screenBg,
      fontWeight:'bold',   
      textAlign:"center"

    },
    subTitle:{
      color:ColorPallete.screenBgTwo,
      fontWeight:'bold',
      marginBottom:4,
      textAlign:"center"

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