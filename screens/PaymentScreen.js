import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import StateButton from '../components/StateButton';
import { useState } from 'react';
import ColorPallete from '../constants/ColorPallete';
import IconButton from '../components/IconButton';

export default function PaymentScreen() {


    return (
      <View style={styles.container}> 
        <View style={styles.innerContainer}>
          {/* <Text style={styles.subtitle}>Subscription</Text> */}
          <Image style={styles.image} source={require('../assets/images/d1.png')}/>

          <IconButton 
              title={'One Time'} 
              icon={'arrow-right-thin'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{flex:0,marginTop:16,}}
              styleInner={{flexDirection:'row-reverse',justifyContent:'space-between',padding:16,}}

              // onPress={switchScreenHandler}
              // screen={'Food'}
            />
          <IconButton 
              title={'Subscription'} 
              icon={'arrow-right-thin'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{flex:0,marginTop:16,}}
              styleInner={{flexDirection:'row-reverse',justifyContent:'space-between',padding:16,}}
              // onPress={switchScreenHandler}
              // screen={'Food'}
            />


        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
      backgroundColor:ColorPallete.screenBg,
      // alignItems:'center',
      justifyContent:'center',

      // borderWidth:1,
      // borderColor:'red' 

    },
    innerContainer:{

      // borderWidth:1,
      // borderColor:'red' 

    },
    image:{
      height:250,
      width:'100%',
      // objectFit:'contain',

    },
    subtitle:{
      fontSize:16,
      fontWeight:'bold',
      marginTop:16,
      marginBottom:32,
    }


});