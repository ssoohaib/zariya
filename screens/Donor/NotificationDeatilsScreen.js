import { StyleSheet, View, Text } from "react-native";
import { NOTIFICATIONS } from "../../dummy_data/dummy_data";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ColorPallete from "../../constants/ColorPallete";


export default function NotificationDeatilsScreen({route}) {
    const selectedNotification = NOTIFICATIONS.find(i=>i.id==route.params.id)

  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.time}>{selectedNotification.time}</Text>
            <View style={styles.bottomContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name={selectedNotification.icon} size={40} color={'white'} />
                </View>
                <Text style={styles.title}>{selectedNotification.title}</Text>
                <Text style={styles.desc}>{selectedNotification.desc}</Text>
                <View style={styles.btnContainer}>
                    
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:ColorPallete.screenBg,
        alignItems:'center',
        justifyContent:'center',


    },
    innerContainer:{
        backgroundColor:ColorPallete.lightBlue,
        borderWidth:1,
        borderColor:ColorPallete.mediumBlue,
        borderRadius:16,
        // alignItems:'center',
        padding:16,
    },
    time:{
        color:ColorPallete.lightTextColor,
        fontWeight:'bold',
        // width:'100%',
        textAlign:'right',
        marginBottom:8,

        // borderWidth:1,
        // borderColor:'red',

    },
    bottomContainer:{
        alignItems:'center',
    },
    iconContainer:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        borderRadius:8,
        marginBottom:8,
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:8,


    },
    desc:{
        marginBottom:8,

    },
    btnContainer:{

    }

})