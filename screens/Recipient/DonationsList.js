import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { DonationList } from '../../dummy_data/recipient_data';
import DonationCard from '../../components/DonationCard';
import ColorPallete from '../../constants/ColorPallete';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

function DonationsList(props) {
    const navigation = useNavigation(); 

    const renderDonationCard = ({ item }) => (
        <DonationCard
            id={item.id}
            food={item.food}
            desc={item.desc}
            imageUrl={item.images[0]}
        />
    );

    const goBackToRecipientHome = () => {
        navigation.goBack();
    };

    const goToDonationDetail = () => {
        navigation.navigate('DonationDetail'); 
    };

    return (
        <GestureHandlerRootView>
            <View style={styles.icon}>
                <Pressable onPress={goBackToRecipientHome}>
                    <Ionicons name="chevron-back" size={26} color="#453953" />
                </Pressable>
                <Text style={styles.heading}>List of Items</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.listContainer}>
                    <FlatList
                        data={DonationList}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDonationCard}
                    />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

export default DonationsList;

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
