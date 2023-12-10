import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function ImprovButton(props) {
  return (
    <View style={props.container}>
        <Pressable>
            <View style={[styles.container, props.style]}>
                {
                    props.icon &&
                    <MaterialIcons name={props.icon} size={24} color={props.iconColor} />
                }
                {
                    props.title && 
                    <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
                }
            </View>
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        padding:16,
        backgroundColor:ColorPallete.lightBlueTwo,
        borderRadius:16,

    },
    title:{
        fontWeight:'bold',

    }
})
