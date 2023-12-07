import { useState } from "react";
import { TextInput, View, Text, StyleSheet, Platform } from "react-native";
import ColorPallete from "../constants/ColorPallete";

export default function ImprovInput(props) {
    const [title,setTitle] = useState('')

    const titleHandler = (str) => {
        setTitle(str)
    }
    

  return (
    <View style={styles.container}>
        {
            props.tag &&
            <View style={styles.tagContainer}>
                <Text style={[styles.tag, props.tagStyle]}>{props.tag}</Text>
            </View>
        }
        <TextInput 
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            value={title}
            onChangeText={titleHandler}
            numberOfLines={props.rows}
            style={[styles.input, props.inputStyle]}
            multiline={true}

        />
        {
            props.liveLength &&
            <Text style={[styles.correctionText, props.correctionTextStyle]}>{title.length}/{props.maxLength} characters</Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{

    },
    tagContainer:{
        alignItems:'flex-start',
        zIndex:99,

    },
    tag:{
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
        borderRadius:8,
        borderColor:ColorPallete.lightTextColor,
    },
    correctionText:{
        marginTop:4,
        textAlign:'right',
        color:ColorPallete.lightTextColor,
        fontWeight:'bold'
    }
})