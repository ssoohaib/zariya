import { StyleSheet, View, TextInput } from "react-native";
import IconButton from "./IconButton";
import { useState } from "react";

export default function InputBar(props) {

    const [input, setInput]=useState('');
    const textChangeHandler =(text)=>{
        setInput(text)
    }


  return (
    <View style={[styles.container, props.style]}>
        <TextInput 
            style={styles.input} 
            placeholder={props.placeHolder}
            placeholderTextColor={'white'}
            value={input}
            onChangeText={textChangeHandler}

        />

        {
            props.icon && 
            <IconButton 
                icon={props.icon} 
                bgColor={props.bgColor} 
                iconColor={props.iconColor} 
                style={{
                    flex:0,
                    borderWidth:1,
                    borderLeftWidth:0,
                    borderRadius:0,
                    borderTopRightRadius:16,
                    borderBottomRightRadius:16,
                    borderColor:'white',
                    justifyContent:'center'
                }}
                // onPress={switchScreenHandler}
                // screen={'Search'}
            />
        }
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,

        
        // borderWidth:1,
        // borderColor:'red',

    },
    input:{
        flex:1,
        padding:12,
        borderWidth:1,
        borderRightWidth:0,
        // borderEndEndRadius:16,
        borderTopLeftRadius:16,
        borderBottomLeftRadius:16,
        borderColor:'white',
        color:'white',
        
        // color:'white',

    },
    icon:{
        // flex:0,
        // borderWidth:1,
        // borderColor:'red',

    }
})