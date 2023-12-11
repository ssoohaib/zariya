import { useState } from "react";
import { TextInput, View, Text, StyleSheet, Platform } from "react-native";
import ColorPallete from "../constants/ColorPallete";

export default function ImprovInput(props) {    

  return (
    <View style={[styles.container, props.outerStyle]}>
        {
            props.tag &&
            <View style={styles.tagContainer}>
                <Text style={[styles.tag, props.tagStyle]}>{props.tag}</Text>
            </View>
        }
        <TextInput 
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            value={props.value}
            onChangeText={props.onChange}
            numberOfLines={props.rows}
            style={[styles.input, props.inputStyle]}
            inputMode={props.inputMode}
            secureTextEntry={props.secureTextEntry}
            multiline={props.multiline}


        />
        {
            props.liveLength &&
            <Text style={[styles.correctionText, props.correctionTextStyle]}>{props.value.length}/{props.maxLength} characters</Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:-16

    },
    tagContainer:{
        alignItems:'flex-start',
        zIndex:99,

    },
    tag:{
        // color:ColorPallete.lightTextColor,
        fontWeight:'bold',
        marginBottom:8,   
        paddingHorizontal:2,   
        paddingRight:3,

        position:'relative',
        top:16,
        left:8,
        backgroundColor:ColorPallete.screenBg,

    },
    input:{

        borderWidth:1,
        padding: Platform.OS=='android' ? 10:16,
        paddingLeft:10,
        borderRadius:16,
        borderColor:ColorPallete.lightTextColor,
    },
    correctionText:{
        marginTop:4,
        textAlign:'right',
        color:ColorPallete.lightTextColor,
        fontWeight:'bold'
    }
})