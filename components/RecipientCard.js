import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AcceptDonationBtn from './AcceptDonationBtn';

import ColorPallete from '../constants/ColorPallete'

function RecipientCard(props) {
    const navigation = useNavigation();

  const handleAccept = () => {
    navigation.navigate('DonationDetail');
  };

    return (
        <View style={styles.container}>
            <Pressable onPress={handleAccept}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image}
                                source={{uri:props.imageUrl}} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameTimeContainer}>
                                    <Text style={styles.name}>{props.name}</Text>
                                    <Text style={styles.time}>{props.time}</Text>
                                </View>
                                <Text style={styles.category}>{props.category}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.call}>
                            <Ionicons
                                name='call' size={20}
                                color={ColorPallete.darkBlue}
                            />
                        </View>
                        <AcceptDonationBtn onPress={handleAccept}>Accept</AcceptDonationBtn>
                    </View>
                </View>
            </Pressable>
        </View>
    )
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
       margin: 10,
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
        flexDirection: 'column',
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
        marginLeft: 180, 
    },
    category: {
        fontWeight: '400',
        //marginTop: 2,
    },
    desc: {
        fontSize: 12,
        lineHeight: 15,
        marginTop: 5,
        fontWeight: '200',
        //marginBottom: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        //marginTop: 5,
        //alignItems: 'center', 
        marginLeft: 100,
    },
    call: {
        borderRadius: 5,
        backgroundColor: ColorPallete.lightBlue,
        marginRight: 10, 
        padding: 8, 
        marginLeft: 150,
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