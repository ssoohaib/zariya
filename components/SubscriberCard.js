import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import ColorPallete from '../constants/ColorPallete';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubscriberDetailModal from './SubscriberDetailModal';
import { useState } from "react";



function SubscriberCard(props) {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    return (
        <>
            <Pressable onPress={toggleModal}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../zariya/assets/images/user2.png')} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{props.name}</Text>
                            <View style={styles.amountContainer}>
                                <Text style={styles.amount}>{props.amount}</Text>
                                <Text style={styles.type}>/{props.duration}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
            <SubscriberDetailModal id={props.id} isModalVisible={isModalVisible} toggleModal={toggleModal} />
        </>
    );
}

export default SubscriberCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ColorPallete.mediumBlue,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        fontSize: 14,
        color: '#999999',
    },
    type: {
        fontSize: 14,
        color: '#999999',
    },
});
