import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function IconButton(props) {

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
                    props.icon &&
                    <MaterialCommunityIcons name={props.icon} size={props.size || 24} 
                    color={props.iconColor ? props.iconColor:'black'} />
                }
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
            </View>
        </Pressable>
    </View>    
  )
}

const styles=StyleSheet.create({
    container:{
        borderRadius:8,
        flex:1,
        overflow:'hidden'
    },
    innerContainer:{
        padding:8,
        alignItems:'center',
        justifyContent:'center',
        // flexDirection:'row-reverse',
        
    },
    text:{

    }
})