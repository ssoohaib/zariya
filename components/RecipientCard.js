import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ColorPallete from '../constants/ColorPallete';
import AcceptDonationBtn from './AcceptDonationBtn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


function RecipientCard(props) {
    const navigation = useNavigation();

    const handleAccept = () => {
        navigation.navigate('DonationsList',{
            donationId:props.id,
            items:props.items,
            category:props.category,
        });
    };

    const handleOpenDialer = () => {
        // Construct the tel URL with the phone number
        const telURL = `tel:${props.phone}`;
    
        // Open the dialer with the pre-filled phone number
        Linking.openURL(telURL);
      };

    return (
        <Pressable onPress={handleAccept}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.topLeft}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.topLeftIcon}>
                                <MaterialCommunityIcons name={'charity'} size={24} color={ColorPallete.screenBg} />
                            </View>
                            <View>
                                <Text style={styles.title}>{props.name}</Text>
                                {/* <Text style={{fontWeight:'600'}}>{props.name}</Text> */}
                                <View style={{flexDirection:'row'}}>
                                    {
                                        props.items.map(i=>
                                            <Text style={{fontWeight:'500'}}>{i.title} </Text>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        <Pressable onPress={handleOpenDialer} style={{backgroundColor:ColorPallete.lightBlueTwo, padding:8, alignItems:'center', justifyContent:'center', borderRadius:8}}>
                            <MaterialIcons name={'phone'} size={24} color={ColorPallete.mediumBlue} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomLeft}>
                        <Text style={styles.subsubtitle}>Expiration</Text>
                        <Text style={styles.subtitle}>{props.till}</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <Text style={styles.status}>{props.category}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default RecipientCard;

const styles = StyleSheet.create({
    container:{
        // borderWidth:.5,
        borderColor:ColorPallete.lightTextColor,
        borderRadius:16,
        padding:16,
        marginBottom:12,
        marginHorizontal:16,

        backgroundColor:ColorPallete.fLightColor,
        // backgroundColor:ColorPallete.screenBg,
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
        // alignItems:'flex-start'
        justifyContent:"space-between",
        // alignItems:'space-between'
        // borderWidth:1,
        flex:1
        
    },
    topLeftIcon:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        justifyContent:"center",
        alignItems:'center',
        marginRight:8,
        borderRadius:8,
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