import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete'
import IconButton from './IconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";

function FeedbackCard(props) {

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
            <Pressable>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image}
                                source={{ uri: props.imageUrl }} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{props.name}</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Text style={styles.email}>{props.email}</Text>
                                </View>
                                <View>
                                    <Text style={styles.feedback}>{props.desc.slice(0,149)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
                </View>
            </Pressable>
        </View>
    )
}

export default FeedbackCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 5,
        backgroundColor: 'white',
        width: '100%',
    },
    innerContainer: {
        margin: 4,
        marginTop: 10,
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
    feedback: {
        lineHeight:20,
        marginRight:60,
    }
});
