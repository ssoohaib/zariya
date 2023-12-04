import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPallete from '../constants/ColorPallete';

export default function NotificationCard(props) {

    const pressHandler=()=>{
        props.onPress('NgoDetails2',props.recieverId)
    }

  return (
    <View style={styles.container}>
        <Pressable onPress={pressHandler} android_ripple={ColorPallete.mediumBlue}>
            <View style={styles.innerContainer}>
                <View style={styles.left}>
                    <MaterialCommunityIcons name={props.icon} size={32} color={'white'} />
                </View>
                <View style={styles.right}>
                    <View style={styles.rightTop}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.time}>{props.time}</Text>
                    </View>
                    <Text style={styles.desc}>{props.desc}</Text>
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

        borderWidth:1,
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
    desc:{
        marginBottom:4,


    },
    time:{
        color:ColorPallete.lightTextColor,
        fontWeight:'bold',

    }
})