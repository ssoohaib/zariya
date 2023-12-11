import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../../constants/ColorPallete";
import { useState } from "react";
import ImprovInput from "../../components/ImprovInput";

export default function Verification() {
  const [code, setCode] =useState(0)

  const codeHandler=(code)=>{
    setCode(code)
  }

  return (
    <ScrollView 
      style={{
          paddingTop:48, 
          backgroundColor:ColorPallete.mediumBlue,
      }} 
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
          flexGrow:1,
      }}>

      <View style={styles.container}>

          <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../assets/images/logo-white.png')} />
          </View>

          <View style={styles.bottom}>
              <View style={styles.bottomInnerContainer}>
                <Text style={styles.title}>Verify Your Account</Text>
                <Text style={styles.p}>Verification code has been sent to your Email Address</Text>
                <Text style={[styles.p, {fontWeight:'bold',marginVertical:4}]}>ligmajones@gmail.com</Text>
                <Text style={styles.p}>Verify your account by entering the code</Text>
                <View style={styles.inputContainer}>
                  <ImprovInput
                    value={code}
                    onChange={codeHandler}
                    inputMode={"numeric"}
                    maxLength={4}
                    inputStyle={{textAlign:"center", fontSize:16, paddingVertical:20}}
                    outerStyle={{width:"100%"}}
                  />
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-between" , marginTop:16}}>
                  <Text style={{fontWeight:'bold', color:ColorPallete.mediumBlue}}>Resend Code</Text>
                  <Text>Expires in <Text style={{fontWeight:'bold', color:ColorPallete.mediumBlue}}>52s</Text></Text>
                </View>
              </View>

              <Pressable style={{marginTop:8}}>
                <View style={[styles.btnContainer, { backgroundColor:ColorPallete.mediumBlue, paddingVertical:20}]}>
                    <Text style={[styles.btnTitle, {color:ColorPallete.screenBg}]}>Verify</Text>
                </View>
            </Pressable>

            
            
            <View style={{height:48}}></View>
          </View>   

      </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:ColorPallete.mediumBlue,       
  
  },
  imageContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    
  },
  image:{
    height:150,
    width:160
  
  },
  bottom:{
    paddingHorizontal:16,
    paddingTop:32,
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    backgroundColor:ColorPallete.screenBg, 
    

  },
  bottomInnerContainer:{

  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:16,
    textAlign:'center',

  },
  p:{
    textAlign:'center',

  },
  inputContainer:{
    position:'relative',
    top:32,
    alignItems:'center',
    marginBottom:32,
  },
  btnContainer:{
    backgroundColor:ColorPallete.screenBgTwo,
    paddingVertical:12,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'center',
    borderRadius:8,
    marginBottom:8,
    marginTop:8,
    
  },
  btnTitle:{
    fontWeight:'bold',
    
  },
  
})