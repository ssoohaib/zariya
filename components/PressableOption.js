import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";


export default function PressableOption(props) {

    const pressHandler=()=>{
        props.onPress(props.screen)
    }
  return (
    <Pressable style={styles.container} onPress={props.onPress && pressHandler}>
        <View style={styles.innerContainer}>
            <View style={styles.left}>
                <View style={styles.leftIcon}>
                    <MaterialIcons name={props.leftIcon} size={24} color={props.leftIconColor ? props.leftIconColor:ColorPallete.darkBlue} />
                </View>
                <Text style={[styles.title, {color:props.titleColor}]}>{props.title}</Text>
            </View>
            <View style={styles.rightIcon}>
                <MaterialIcons name={props.rightIcon} size={24} color={props.rightIconColor ? props.rightIconColor:ColorPallete.darkBlue} />
            </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
    //   borderColor:ColorPallete.lightTextColor,
    //   borderBottomWidth:1,
        marginBottom:8,
    },
    innerContainer:{
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:'center',
      paddingVertical:8,

    },
    left:{
        flexDirection:'row',
        alignItems:'center',

    },
    leftIcon:{
        backgroundColor:ColorPallete.lightBlue,
        padding:8,
        marginRight:8,
        borderRadius:8,

    },
    title:{
      fontSize:16,
      fontWeight:'bold',
    //   color:ColorPallete.lightTextColor,

    }
});