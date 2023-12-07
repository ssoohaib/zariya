import { Pressable, StyleSheet, View, Text } from "react-native";
import ColorPallete from "../constants/ColorPallete";

export default function StateButton(props) {

    const pressHandler = ()=>{
        props.onPress(props.return)
    }


  return (
    <View style={[styles.container]}>
        <Pressable onPress={pressHandler}>
            <View style={[styles.innerContainer, props.btnStyle, {backgroundColor:props.selected.bgColor}]}>
                <Text style={[styles.text, {color:props.selected.textColor}]}>{props.title}</Text>
            </View>
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        // flex:1,
    },
    innerContainer:{
        // height:100,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:8,
        overflow:'hidden',

        borderColor:ColorPallete.darkBlue,

    },
    text:{
        // fontWeight:'bold',
        color:ColorPallete.darkBlue,
        // fontSize:16,

    }
})
