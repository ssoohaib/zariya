import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../../constants/ColorPallete";

export default function AuthTemplate() {
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
  
})