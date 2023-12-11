import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPallete from '../constants/ColorPallete';
import { useState } from 'react';

export default function NotificationCard(props) {

    const [status,setStatus]=useState(props.status)

    const pressHandler=()=>{
        props.onPress('NgoDetails2',props.recieverId)
    }

    const readHandler=()=>{
        props.toggleRead(props.id)
        if (status=="unread")
            setStatus("read")
        else
            setStatus("unread")
    }

  return (
    <View style={styles.container}>
        <Pressable onPress={pressHandler} android_ripple={ColorPallete.mediumBlue}>
            <View style={[styles.innerContainer, status == 'unread' && {backgroundColor:ColorPallete.lightBlueTwo}]}>
                <View style={styles.left}>
                    <MaterialCommunityIcons name={props.icon} size={32} color={'white'} />
                </View>
                <View style={styles.right}>
                    <View style={styles.rightTop}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.time}>{props.time}</Text>
                    </View>
                    <View style={styles.rightBottom}>
                        <Text style={styles.desc}>
                            {props.desc.slice(0,35)}
                        </Text>
                        <Pressable style={styles.eyeIcon} onPress={readHandler}>
                            <MaterialCommunityIcons name="eye-outline" size={24} color={ColorPallete.lightTextColor} />
                        </Pressable>
                    </View>
                </View>    
            </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:8,

    },
    innerContainer:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        padding:8,
        borderRadius:8,
        backgroundColor:ColorPallete.lightBlue,

        // borderWidth:1,
        borderColor:ColorPallete.mediumBlue,
    },
    left:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        borderRadius:8,
        marginRight:8,

    },
    right:{
        flex:1,
    },
    rightTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:4,
    },
    title:{
        fontSize:15,
        fontWeight:'bold',

    },
    time:{
        color:ColorPallete.lightTextColor,
        fontWeight:'bold',

    },
    rightBottom:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        
    },
    desc:{
        marginBottom:4,


    },
    eyeIcon:{
        // borderWidth:1,
        // borderColor:ColorPallete.lightTextColor,
        padding:4,
        // borderRadius:8,
        // marginLeft:4,

    }
})