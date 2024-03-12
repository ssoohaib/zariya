import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DonationList } from '../../dummy_data/recipient_data';
import ColorPallete from '../../constants/ColorPallete';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import SubscriberCard from '../../components/SubscriberCard';
import { Subscriber } from '../../dummy_data/recipient_data';

function Subscribers(props) {
    const navigation = useNavigation(); 

    const renderSubscriberCard = ({ item }) => (
        <SubscriberCard
            id={item.id}
            name={item.name}
            imageUrl={item.images[0]}
            amount={item.amount}
            type={item.type}
        />
    );

    const goBackToRecipientHome = () => {
        navigation.goBack();
    };


    return (
        <GestureHandlerRootView>
            <View style={styles.icon}>
                <Pressable onPress={goBackToRecipientHome}>
                    <Ionicons name="chevron-back" size={26} color="#453953" />
                </Pressable>
                <Text style={styles.heading}>Subscribers</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.listContainer}>
                    <FlatList
                        data={Subscriber}
                        keyExtractor={(item) => item.id}
                        renderItem={renderSubscriberCard}
                    />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

export default Subscribers;

const styles = StyleSheet.create({
    innerContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 70,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: ColorPallete.mediumBlue,
        marginLeft: 5,
    },
    listContainer: {
        marginTop: 15,
    },
});
