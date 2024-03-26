import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AcceptDonationBtn from './AcceptDonationBtn';
import ColorPallete from '../constants/ColorPallete'

function DonationCard(props) {
    const navigation = useNavigation();

    const handleAccept = () => {
        navigation.navigate('DonationDetail');
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handleAccept}>
                {/* <View style={styles.innerContainer}> */}
                    {/* <View> */}
                        <View style={styles.titleContainer}>
                            <Image style={styles.image} source={{ uri: props.imageUrl }} />
                            <View style={[styles.nameTimeDescContainer]}>
                                {/* <View style={[styles.nameTimeContainer, {borderWidth:1, flex:1}]}> */}
                                <Text style={[styles.food, {fontWeight:"bold", fontSize:16}]}>{props.title}</Text>

                                {
                                    props.category == 'Food' &&
                                    <>
                                        <Text>Type: {props.item.type}</Text>
                                        <Text>Servings: {props.item.servings}</Text>
                                    </>
                                }
                                {
                                    props.category == 'Clothes' &&
                                    <>
                                        <Text>Season: {props.item.season}</Text>
                                        <Text>Gender: {props.item.gender}</Text>
                                        <Text>Size: {props.item.size}</Text>
                                        <Text>Quantity: {props.item.quantity}</Text>
                                    </>
                                }
                                {
                                    props.category == "Medicine" &&
                                    <>
                                        <Text>Type: {props.item.type}</Text>
                                        <Text>Quantity: {props.item.quantity}</Text>
                                        <Text>ExpiryDate: {props.item.expiryDate}</Text>
                                    </>
                                }
                                {
                                    props.category == "Ration" &&
                                    <>
                                        <Text>Quantity: {props.item.quantity}</Text>
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
        backgroundColor: 'white',
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
        alignItems: 'center',
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
