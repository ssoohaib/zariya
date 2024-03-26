import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ColorPallete from '../constants/ColorPallete';
import AcceptDonationBtn from './AcceptDonationBtn';

function RecipientCard(props) {
    const navigation = useNavigation();

    const handleAccept = () => {
        navigation.navigate('DonationsList',{
            items:props.items,
            category:props.category,
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleAccept}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image} source={{ uri: props.imageUrl }} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameTimeContainer}>
                                    <Text style={styles.name}>{props.name}</Text>
                                    <View>
                                        {
                                            props.items.map((item, index) => {
                                                return (
                                                    <Text key={index} style={styles.desc}>{item.title}</Text>
                                                );
                                            })
                                        }
                                    </View>
                                    
                                </View>
                                <Text style={styles.category}>{props.category}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:8, marginTop:8, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        
                        <View>
                            <View>
                                <Text style={{fontWeight:'bold'}}>From</Text>
                                <Text style={styles.time}>{props.from}</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight:'bold'}}>Till</Text>
                                <Text style={styles.time}>{props.till}</Text>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <View style={styles.call}>
                                <Ionicons name='call' size={20} color={ColorPallete.darkBlue} />
                            </View>
                            <AcceptDonationBtn onPress={handleAccept}>Accept</AcceptDonationBtn>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default RecipientCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 5,
        backgroundColor: 'white',
        width: '100%',
    },
    innerContainer: {
        padding:8
    //    margin: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
       // marginLeft: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:16,
    },
    nameTimeDescContainer: {
        flexDirection: 'column',
        // alignItems:"space-between",
        flex:1,
        marginLeft: 10,
        // borderWidth:1
    },
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    time: {
        fontWeight: '400',
        // marginLeft: 180, 
    },
    category: {
        fontWeight: '400',
        //marginTop: 2,
    },
    desc: {
        fontSize: 14,
        // lineHeight: 15,
        marginTop: 4,
        fontWeight: "bold",
        //marginBottom: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 6,
        // justifyContent:"center",
        // alignItems: 'center', 
        // marginLeft: 100,
    },
    call: {
        borderRadius: 5,
        backgroundColor: ColorPallete.lightBlue,
        marginRight: 8, 
        padding: 8, 
        // marginLeft: 150,
    },
    btn: {
        borderRadius: 8,
        width: 40,
    },
    quantityText: {
        fontWeight: '100',
        marginLeft: 10,
        marginTop: 15,
        fontSize: 12,
    },

})