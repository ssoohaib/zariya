import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import StateButton from '../components/StateButton';
import { useState } from 'react';
import ColorPallete from '../constants/ColorPallete';
import IconButton from '../components/IconButton';
import AlertText from '../components/AlertText';
import { useToast } from 'react-native-toast-notifications';


export default function PaymentScreen({navigation}) {

  const [paymentType,setPaymentType]=useState('')
  const [duration,setDuration]=useState('')
  const [amount,setAmount]=useState(0)
  const toast = useToast()

  const [alertText,setAlertText]=useState('')

  const amountHandler=(amount)=>{
    setAmount(amount)
  }

  const paymentTypeHandler =(type)=>{
    setPaymentType(type)
  }

  const durationHandler = (duration) =>{
    setDuration(duration)
  }

  const showToast = (text)=>{
    toast.show(text,{
      type:'warning'
    })
  }

  const validator = (screenName)=>{
    let warn=[]
    if (paymentType.length<1){
      warn.push('Select Type ')
    }
    if (paymentType=='Subscription'){
      if(duration.length<1){
        warn.push('Choose Duration ')
      }
    }
    if(amount<500){
      warn.push('Min amount Rs. 500')
    }
    // console.log('>>>>',amount, typeof amount)

    if (warn.length<1){
      navigation.navigate("PaymentDetails",{
        paymentType:screenName
      })
      return
    }

    showToast(warn)
  }


    return (
      <ScrollView style={styles.container}> 
        <View style={styles.typeContainer}>
          <Text style={styles.subtitle}>Type</Text>
          {/* <Button title='alert' onPress={()=>validator('lol')} /> */}
          <View style={styles.typeBtnContainer}>
            <StateButton
              title={'One Time'}
              return={'One Time'}
              onPress={paymentTypeHandler}
              btnStyle={{marginRight:4, padding:16,}}

              selected={
                paymentType === 'One Time' &&
                {bgColor:ColorPallete.lightBlue}
              }
            />
            <StateButton
              title={'Subscription'}
              return={'Subscription'}
              onPress={paymentTypeHandler}
              btnStyle={{marginLeft:4, padding:16,}}

              selected={
                paymentType === 'Subscription' &&
                {bgColor:ColorPallete.lightBlue}
              }
            />

          </View>
        </View>

        {
          paymentType == 'Subscription' &&
          <View>
            <Text style={styles.subtitle}>Duration</Text>
            <View style={styles.typeBtnContainer}>
                <StateButton
                  title={'Daily'}
                  return={'Daily'}
                  onPress={durationHandler}
                  btnStyle={{marginRight:4, padding:16,}}

                  selected={
                    duration === 'Daily' &&
                    {bgColor:ColorPallete.lightBlue}
                  }
                />
                <StateButton
                  title={'Weekly'}
                  return={'Weekly'}
                  onPress={durationHandler}
                  btnStyle={{marginHorizontal:4, padding:16,}}

                  selected={
                    duration === 'Weekly' &&
                    {bgColor:ColorPallete.lightBlue}
                  }
                />
                <StateButton
                  title={'Monthy'}
                  return={'Monthly'}
                  onPress={durationHandler}
                  btnStyle={{marginLeft:4, padding:16,}}

                  selected={
                    duration === 'Monthly' &&
                    {bgColor:ColorPallete.lightBlue}
                  }
                />

            </View>
          </View>
        }

        <View style={styles.amountContainer}>
          <Text style={styles.subtitle}>Enter the donation amount</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Amount' 
            placeholderTextColor={colorPallete.lightTextColor} 
            keyboardType='numeric' 
            value={amount}
            onChangeText={amountHandler}
          />
          <Text style={styles.indicator}>Min Rs. 500</Text>

          <IconButton 
              title={'Master Card'} 
              icon={'arrow-right-thin'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{flex:0,padding:8,marginTop:12,borderWidth:1,borderColor:colorPallete.darkBlue}}
              styleInner={{flexDirection:'row-reverse', justifyContent:'space-between'}}
              validator={validator}
              validatorReturn={'Master Card'}

            />
          <IconButton 
              title={'Easypaisa'} 
              icon={'arrow-right-thin'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{flex:0,padding:8,marginTop:8,borderWidth:1,borderColor:colorPallete.darkBlue}}
              styleInner={{flexDirection:'row-reverse', justifyContent:'space-between'}}
              validator={validator}
              validatorReturn={'Easypaisa'}

            />
          <IconButton 
              title={'Jazz Cash'} 
              icon={'arrow-right-thin'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{flex:0,padding:8,marginTop:8,borderWidth:1,borderColor:colorPallete.darkBlue}}
              styleInner={{flexDirection:'row-reverse', justifyContent:'space-between'}}
              validator={validator}
              validatorReturn={'Jazz Cash'}

            />
          

        </View>
        
       

      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
      backgroundColor:ColorPallete.screenBg,


      // borderWidth:1,
      // borderColor:'red' 

    },
    typeContainer:{

      // borderWidth:1,
      // borderColor:'red' 

    },
    typeBtnContainer:{
      flexDirection:'row',

      // borderWidth:1,
      // borderColor:'red' 


    },
    subtitle:{
      fontWeight:'bold',
      marginVertical:16,
      fontSize:15,
    },
    amountContainer:{

      // borderWidth:1,
      // borderColor:'red' 
    },
    input:{
      padding:16,
      color:ColorPallete.darkBlue,
      borderWidth:1,
      borderRadius:8,
      borderColor:ColorPallete.darkBlue,

    },
    indicator:{
      textAlign:'right',
      marginTop:8,
      fontWeight:'bold',
      color:colorPallete.lightTextColor
    }


});