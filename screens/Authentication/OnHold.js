import { Image, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../../constants/ColorPallete";

export default function OnHold() {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZkVW9Zs8ryvd58g8AhjaPhzcXv3Q87nXnBgXyp2u8PJq4usCm8hUES2BVkz0K08pi7d62Formr7a_FpFUAxZU97GooJ5WVrjM=w1919-h910'}}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={{fontWeight:'bold', fontSize:20, color:ColorPallete.mediumBlue, marginBottom:16}}>Verification</Text>
          <Text style={{fontSize:16, color:ColorPallete.mediumBlue}}>Your account is on hold for further verification.</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPallete.mediumBlue,
        justifyContent:"space-between"
        // alignItems:"space-between",
        // justifyContent: "center",
        // alignItems: "center",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: 150,
      width: 160,
    },
    bottom: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 32,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: ColorPallete.screenBg,
    },
})