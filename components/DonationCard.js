import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AcceptDonationBtn from './AcceptDonationBtn';
import ColorPallete from '../constants/ColorPallete'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
// import AcceptBtn from '../components/AcceptBtn'

function DonationCard(props) {
     const navigation = useNavigation();

     const handleAccept = () => {
        navigation.navigate('DonationDetail',{
            data:props.item,
            category:props.category,
        });
    };

    // console.log('>>>',props)

    return (
        <View style={styles.container}>
            <Pressable onPress={handleAccept}>
                {/* <View style={styles.innerContainer}> */}
                    {/* <View> */}
                        <View style={styles.titleContainer}>
                            {/* <Image style={styles.image} source={{ uri: props.imageUrl }} /> */}
                            <View style={{backgroundColor:ColorPallete.mediumBlue, padding:8, borderRadius:8}}>
                                {
                                    props.category == 'Food' &&
                                    <MaterialCommunityIcons name={'food'} size={24} color={ColorPallete.screenBg} />
                                }
                                {
                                    props.category == 'Clothes' &&
                                    <MaterialCommunityIcons name={'tshirt-crew'} size={24} color={ColorPallete.screenBg} />
                                }
                                {
                                    props.category == 'Medicine' &&
                                    <MaterialCommunityIcons name={'medical-bag'} size={24} color={ColorPallete.screenBg} />
                                }
                                {
                                    props.category == 'Ration' &&
                                    <MaterialCommunityIcons name={'food-variant'} size={24} color={ColorPallete.screenBg} />
                                }
                            </View>

                            <View style={[styles.nameTimeDescContainer]}>
                                {/* <View style={[styles.nameTimeContainer, {borderWidth:1, flex:1}]}> */}
                                <Text style={[styles.food, {fontWeight:"bold", fontSize:16}]}>{props.title}</Text>

                                {
                                    props.category == 'Food' &&
                                    <>
                                        <Text style={{marginTop:8, marginBottom:4}}>Type: <Text style={{fontWeight:'bold'}}>{props.item.type}</Text></Text>
                                        <Text>Servings: <Text style={{fontWeight:'bold'}}>{props.item.servings}</Text></Text>
                                    </>
                                }
                                {
                                    props.category == 'Clothes' &&
                                    <>
                                        <Text style={{marginTop:8, marginBottom:4}}>Season: <Text style={{fontWeight:'bold'}}>{props.item.season}</Text></Text>
                                        <Text style={{marginBottom:4}}>Gender: <Text style={{fontWeight:'bold'}}>{props.item.gender}</Text></Text>
                                        <Text style={{marginBottom:4}}>Size: <Text style={{fontWeight:'bold'}}>{props.item.size}</Text></Text>
                                        <Text style={{marginBottom:4}}>Quantity: <Text style={{fontWeight:'bold'}}>{props.item.quantity}</Text></Text>
                                    </>
                                }
                                {
                                    props.category == "Medicine" &&
                                    <>
                                        <Text style={{marginTop:8, marginBottom:4}}>Type: <Text style={{fontWeight:'bold'}}>{props.item.type}</Text></Text>
                                        <Text style={{marginBottom:4}}>Quantity: <Text style={{fontWeight:'bold'}}>{props.item.quantity}</Text></Text>
                                        <Text style={{marginBottom:4}}>ExpiryDate: <Text style={{fontWeight:'bold'}}>{props.item.expiryDate.slice(0,10)}</Text></Text>
                                    </>
                                }
                                {
                                    props.category == "Ration" &&
                                    <>
                                        <Text>Quantity: <Text style={{fontWeight:'bold'}}>{props.item.quantity}</Text></Text>
                                    </>
                                }

                                



                                {/* </View> */}
                                {/* <Text style={styles.desc}>{props.desc.slice(0, 90)}...</Text> */}
                                {/* <View style={styles.forwardIconContainer}>
                                    <Ionicons name="chevron-forward" size={16} color="#453953" />
                                </View> */}
                            </View>
                        </View>
                    {/* </View> */}
                {/* </View> */}
            </Pressable>
        </View>
    )
}

export default DonationCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 5,
        backgroundColor: ColorPallete.fLightColor,
        // width: '100%',
        borderRadius: 8,
        padding: 8,
    },
    innerContainer: {
        padding:16,
        // margin: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        // marginLeft: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        alignItems:'flex-start'
    },
    nameTimeDescContainer: {
        // flexDirection: 'column',
        marginLeft: 10,
    },
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    time: {
        fontWeight: '400',
        marginLeft: 150,
    },
    category: {
        fontWeight: '400',
        //marginTop: 2,
        fontSize: 12,
    },
    desc: {
        fontSize: 12,
        lineHeight: 15,
        marginTop: 5,
        fontWeight: '200',
        marginRight: 10,
        //marginBottom: 5,
    },
    quantityText: {
        fontWeight: '100',
        marginLeft: 10,
        marginTop: 15,
        fontSize: 12,
    },
    forwardIconContainer: {
        position: 'absolute',
        //right: 0,
        top: 40,
        left: 265,
        alignItems: 'flex-end',
    },
    

})
