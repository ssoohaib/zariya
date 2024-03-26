import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DonationList } from '../../dummy_data/recipient_data';
import ColorPallete from '../../constants/ColorPallete';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SubscriberCard from '../../components/SubscriberCard';
import { Subscriber } from '../../dummy_data/recipient_data';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Subscribers(props) {
    const { currentUser } = useContext(AuthContext);

    const navigation = useNavigation();

    const goBackToRecipientHome = () => {
        navigation.goBack();
    };

    const switchScreen = (screen) => {
        navigation.navigate(screen)
    }

    const renderSubscriberCard = itemData => {
        if (!currentUser)
            return


        return (
            <SubscriberCard
                id={itemData.item.id}
                name={itemData.item.donorName}
                amount={itemData.item.amount}
                duration={itemData.item.duration}
            />
        )

    }


    return (
        <>
            {
                currentUser &&
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
                                data={currentUser.subscribedUsers}
                                keyExtractor={i => i.id}
                                renderItem={renderSubscriberCard}
                            />
                        </View>
                    </View>
                </GestureHandlerRootView>
            }
        </>
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
