import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import ColorPallete from '../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';

export default function NotFound(props) {
  return (
    <View style={styles.noNotificationsContainer}>
        <StatusBar style='dark' />

        <View style={styles.noNotificationsInnerContainer}>
            <Text style={styles.subtitle}>{props.title}</Text>
            <Text style={styles.p}>{props.desc}</Text>
            <IconButton 
            title={props.btnTitle} 
            bgColor={ColorPallete.mediumBlue} 
            iconColor={ColorPallete.screenBg}
            style={{flex:0,padding:4}}
            textStyle={props.btnTitleStyle}
            onPress={props.btnFunctions}
            screen={props.screen}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    noNotificationsContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:16,
      backgroundColor:ColorPallete.screenBg,

      // borderWidth:1,
      // borderColor:'red',

    },
    noNotificationsInnerContainer:{
      alignItems:'center',

      // borderWidth:1,
      // borderColor:'red',

    },
    subtitle:{
      fontSize:16,
      fontWeight:'bold',
      marginBottom:8,
      textAlign:'center',

    },
    p:{
      marginBottom:8,
      textAlign:'center',
      lineHeight:18,

    }
});