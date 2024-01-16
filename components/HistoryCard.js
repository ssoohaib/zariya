import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";
import { useState } from "react";
import HistoryModal from "./HistoryModal";

export default function HistoryCard(props) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    let icon='';
    let desc=''
    if (props.donationType=="Food"){
        icon = "food-fork-drink"
        desc="Servings: "
    }
    else if (props.donationType=="Medicine"){
        icon = "medical-bag"
        desc="Quantity: "
    }
    else if (props.donationType=="Ration"){
        icon = "food-variant"
        desc="Weight: "
    }
    else if (props.donationType=="Clothes"){
        icon = "tshirt-crew"
        desc="Items: "
    }
    else if (props.donationType=="Monetary"){
        icon = "cash"
        desc="Amount: "
    }

  return (
    <>
        <Pressable onPress={toggleModal}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.topLeft}>
                        <View style={styles.topLeftIcon}>
                            <MaterialCommunityIcons name={icon} size={24} color={ColorPallete.screenBg} />
                        </View>
                        <View>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.subtitle}>{props.puid}</Text>
                            <Text style={styles.subsubtitle}>{desc} 3</Text>
                        </View>
                    </View>
                    <View style={styles.topRight}>
                        <MaterialIcons name={'keyboard-arrow-right'} size={24} color={ColorPallete.darkBlue} />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomLeft}>
                        <Text style={styles.subsubtitle}>Donation date</Text>
                        <Text style={styles.subtitle}>{props.date}</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <Text style={styles.status}>{props.status}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
        <HistoryModal id={props.id} isModalVisible={isModalVisible} toggleModal={toggleModal}/>
    </>
  )
}

const styles=StyleSheet.create({
    container:{
        // borderWidth:1,
        borderColor:ColorPallete.lightTextColor,
        borderRadius:8,
        padding:16,
        marginBottom:12,

        // backgroundColor:ColorPallete.mediumBlue,
        backgroundColor:'#F5F5F5',

    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:.5,
        borderColor:ColorPallete.lightTextColor,
        paddingBottom:12,
        
        

    },
    topLeft:{
        flexDirection:'row',
        // justifyContent:'flex-start'
        alignItems:'flex-start'
        
    },
    topLeftIcon:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        justifyContent:"center",
        alignItems:'center',
        marginRight:8,
        borderRadius:4,
    },
    topRight:{

    },
    bottom:{
        paddingTop:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    bottomLeft:{

    },
    bottomRight:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        // paddingHorizontal:8,
        borderRadius:8,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:4,
        color:ColorPallete.darkBlue,

    },
    subtitle:{
        fontWeight:'bold',
        color:ColorPallete.mediumBlue,
        fontSize:15,

    },
    subsubtitle:{
        color:ColorPallete.lightTextColor,
        fontSize:14,

    },
    status:{
        color:ColorPallete.screenBg,
        fontWeight:'bold',
        
    }

})