import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import ColorPallete from '../constants/ColorPallete'

function RecipientAnalyticCard(props) {

    return (
        <View style={styles.container}>
            <Pressable>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <View style={styles.icon}>
                            <Ionicons>{props.icon}</Ionicons>
                            </View>
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameTimeContainer}>
                                    <Text style={styles.name}>{props.category}</Text>
                                </View>
                            </View>
                            <Text style={styles.money}>{props.money}</Text>
                        </View>
                    </View>
                </View>
            </Pressable >
        </View >
    );

}

export default RecipientAnalyticCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 2,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 2,
        height: 70,
        borderColor: 'transparent',
        backgroundColor: 'white',
    },
    innerContainer: {
        margin: 10,
    },
    icon: {
        width: 40, 
        height: 40, 
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        marginLeft: 80,
    },
    nameTimeDescContainer: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
       // justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
    },
    nameMoneyDescContainer: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    nameMoneyContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ColorPallete.darkBlue,
        marginTop: 5,
    },
    money: {
        fontWeight: '200',
        //color: ColorPallete.darkBlue,
        marginLeft: 140,
    },
    percent: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 10,
        color: ColorPallete.darkBlue,
    },


})