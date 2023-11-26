import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton(props) {

    const pressHandler =()=>{
        props.screen &&
        props.onPress(props.screen)
    }

  return (
    <View style={[styles.container, props.style]}>
        <Pressable onPress={pressHandler}>
            <View style={styles.innerContainer}>
                <MaterialCommunityIcons name={props.icon} size={24} color="black" />
                {
                    props.title &&
                    <Text style={styles.text}>{props.title}</Text>
                }
            </View>
        </Pressable>
    </View>    
  )
}

const styles=StyleSheet.create({
    container:{
        // alignItems:'center',
        // justifyContent:'center',
        borderRadius:8,
        flex:1,
        // backgroundColor:'white',
        // width:85,
        borderWidth:1,
        borderColor:'red',
    },
    innerContainer:{
        padding:8,
        alignItems:'center',
        justifyContent:'center',
        

        // borderWidth:1,
        // borderColor:'red',
    },
    text:{

    }
})