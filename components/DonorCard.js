import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete'
import IconButton from './IconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import DonorInfoModal from "../components/DonorInfoModal"

function DonorCard(props) {

    const statusStyles = {
        color: props.status === 'Verified' ? 'green' : 'red',
    };
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const switchWithPayload = (screen,screenName)=>{
        navigation.navigate(screen,{
          paymentType:screenName
        })
      }

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleModal}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image}
                                source={{ uri: props.imageUrl }} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{props.firstName} {props.lastName}</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Text style={styles.email}>Email: {props.email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </Pressable>
            <DonorInfoModal id={props.id} isModalVisible={isModalVisible} toggleModal={toggleModal} switchWithPayload={switchWithPayload}
                userData={{
                    firstName: props.firstName,
                    lastName: props.lastName,
                    email: props.email,
                    contactNumber: props.contactNumber,
                    imageUrl: props.imageUrl,
                    status: props.status,
                }}
            />
        </View>
    )
}

export default DonorCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 4,
        // marginTop:6,
        backgroundColor: '#f5f5f5',
        // width: '97%',
        borderRadius:8,
        // marginLeft:7
    },
    innerContainer: {
        margin: 10,
        marginTop: 10
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
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emailContainer: {
        marginTop: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
});
