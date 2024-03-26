import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function AdminHomebtn(props) {

    const pressHandler =()=>{
        props.screen &&
        props.onPress(props.screen)
    }

    const pressWithValidator=()=>{
        props.validator(props.validatorReturn)
    }
    

  return (
    <View style={[styles.container, props.style, {backgroundColor:props.bgColor}]}>
        <Pressable onPress={props.validator ? pressWithValidator:pressHandler} android_ripple={{color:ColorPallete.darkBlue}}>
            <View style={[styles.innerContainer,props.styleInner]}>
                {
                    props.title &&
                    <Text 
                    style={
                        props.iconColor ?
                        [styles.text, props.textStyle, {color:props.iconColor}]
                        : [styles.text, props.textStyle]
                    }>
                    {props.title}</Text>
                }
                {
                    props.icon &&
                    <View style={{alignItems: 'center'}}>
                        <MaterialCommunityIcons name={props.icon} size={28} 
                        color={props.iconColor ? props.iconColor:'black'} />
                    </View>
                }
            </View>
        </Pressable>
    </View>    
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        borderRadius:16,
    },
    innerContainer:{
        height:85,
        padding:10,
        justifyContent:'space-between',
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
    }
})