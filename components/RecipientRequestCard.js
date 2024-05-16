import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete'
import IconButton from './IconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import RecipientRequestModal from "../components/RecipientRequestModal"

function RecipientRequestCard(props) {

    const statusStyles = {
        color: props.recipientApproval === 'Verified' ? 'green' : 'red',
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
                            {/* <Image style={styles.image}
                                source={{ uri: props.logo }} /> */}
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{props.title}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </Pressable>
            <RecipientRequestModal id={props.id} isModalVisible={isModalVisible} toggleModal={toggleModal} switchWithPayload={switchWithPayload}
                userData={{
                    title: props.title,
                    logo: props.logo,
                    description: props.description,
                    recipientApproval: props.recipientApproval,
                    city: props.city,
                    causes: props.causes,
                }}
             />
        </View>
    )
}

export default RecipientRequestCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 5,
        backgroundColor: 'white',
        width: '100%',
    },
    innerContainer: {
        margin: 10,
        marginTop: 20
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
