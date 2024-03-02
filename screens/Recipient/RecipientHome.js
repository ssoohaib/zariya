import RecipientAnalyticCard from "../../components/RecipientAnalyticCard";
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import ImageButton from '../../components/ImageButton';
import ColorPallete from "../../constants/ColorPallete";
import { useNavigation } from '@react-navigation/native';
import DonationDetail from "./DonationDetail";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Donors } from '../../dummy_data/recipient_data';
import RecipientCard from '../../components/RecipientCard';
import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';



function RecipientHome() {
    const { currentUser } = useContext(AuthContext);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [filteredRequests, setFilteredRequests] = useState(Donors); // Default to all requests

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleFilterOption = (filter) => {
        setSelectedFilter(filter);
        toggleModal(); // Close the modal after selecting the filter
        // Filter requests based on selected filter
        if (filter === 'All') {
            setFilteredRequests(Donors); // Show all requests
        } else {
            const filteredData = Donors.filter(request => request.category === filter);
            setFilteredRequests(filteredData);
        }
    };


    const navigation = useNavigation();
    const switchScreenHandler = (screen) => {
        navigation.navigate(screen)
    }

    const recipientMainScreenHandler = (id) => {
        navigation.navigate('RecieveDonation', {
            id: id
        })
    }


    const renderFlatList = (itemData) => {
        return (
            <RecipientCard
                id={itemData.item.id}
                name={itemData.item.name}
                //onPress={donationDetail}
                desc={itemData.item.desc}
                time={itemData.item.time}
                category={itemData.item.category}
                imageUrl={itemData.item.images[0]}
            />
        )
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.headerUpper}>
                    <View>
                        <Text style={styles.amount}>PKR. 79,865.40</Text>
                        <Text style={styles.headerText}>Donations Received</Text>
                    </View>
                    <View style={styles.userContainer}>
                        <View style={styles.userTextContainer}>
                            <Text style={styles.userGreet}>Welcome,</Text>
                            <Text style={styles.userName}>{currentUser.title}</Text>
                        </View>
                        <ImageButton
                            style={styles.userImage}
                            onPress={switchScreenHandler}
                            screen={'Profile'}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.incomingView}>
                    <Text style={styles.buttonsText}>Incoming Requests</Text>
                    <Text style={styles.dataText}>57</Text>
                </View>
                <View style={styles.addressedView}>
                    <Text style={styles.addresedText}>Addressed Requests</Text>
                    <Text style={styles.addressedData}>143</Text>
                </View>
                <View style={styles.subscriptionView}>
                    <Text style={styles.buttonsText}>Subscriptions</Text>
                    <Text style={styles.dataText}>7</Text>
                </View>
            </View>
            <View style={styles.headingView}>
                <Text style={styles.requestHeading}>Requests</Text>
                <TouchableOpacity onPress={toggleModal} style={styles.filter}>
                    <Ionicons name="options" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Modal for filtering options */}
            {isModalVisible && (
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => handleFilterOption('All')} style={styles.optionContainer}>
                        <View style={styles.option}>
                            <Text style={styles.optionText}>All</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterOption('Clothes')} style={styles.optionContainer}>
                        <View style={styles.option}>
                            <Text style={styles.optionText}>Clothes</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterOption('Ration')} style={styles.optionContainer}>
                        <View style={styles.option}>
                            <Text style={styles.optionText}>Ration</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterOption('Medicine')} style={styles.optionContainer}>
                        <View style={styles.option}>
                            <Text style={styles.optionText}>Medicine</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterOption('Food')} style={styles.optionContainer}>
                        <View style={styles.option}>
                            <Text style={styles.optionText}>Food</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )}

            <ScrollView>
                <View style={styles.ngoContainer}>
                    <View style={styles.ngoListContainer}>
                        <FlatList
                            data={filteredRequests}
                            keyExtractor={(item) => item.id}
                            renderItem={renderFlatList} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default RecipientHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEE1E0',
    },
    headerContainer: {
        paddingTop: 48,
        paddingBottom: 50,
        paddingLeft: 15,
        paddingRight: 10,
        //paddingHorizontal:16,
        backgroundColor: ColorPallete.mediumBlue,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,

    },
    headerUpper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: "row",
    },
    userTextContainer: {
        marginRight: 8,
        justifyContent: 'center',
    },
    userGreet: {
        color: ColorPallete.screenBg,
        textAlign: 'right',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ColorPallete.screenBg,
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: ColorPallete.lightBlue,

    },
    lowerHeader: {
        marginTop: 30,
    },
    amount: {
        fontWeight: 'bold',
        color: ColorPallete.lightBlue,
        fontSize: 20,
        marginTop: 10,
    },
    headerText: {
        color: ColorPallete.lightBlue,
        fontSize: 9,
        marginTop: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
    },
    analyticContainer: {
        marginTop: 10,
    },
    day: {
        fontWeight: '200',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 15,
    },
    ngoContainer: {
        //paddingHorizontal:16,

    },
    ngoListContainer: {

    },
    incomingView: {
        borderRadius: 8,
        height: 90,
        width: 120,
        marginLeft: 5,
        backgroundColor: ColorPallete.mediumBlue,
    },
    addressedView: {
        borderRadius: 8,
        height: 90,
        width: 120,
        marginLeft: 10,
        backgroundColor: ColorPallete.lightBlue,
    },
    subscriptionView: {
        borderRadius: 8,
        height: 90,
        width: 120,
        marginLeft: 10,
        backgroundColor: ColorPallete.mediumBlue,
    },
    buttonsText: {
        fontSize: 10,
        fontWeight: '500',
        marginTop: 15,
        textAlign: 'center',
        color: ColorPallete.screenBg,
    },
    addresedText: {
        fontSize: 10,
        fontWeight: '700',
        marginTop: 15,
        textAlign: 'center',
        color: ColorPallete.mediumBlue,
    },
    dataText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15,
        textAlign: 'center',
        color: ColorPallete.screenBg,
    },
    addressedData: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 15,
        textAlign: 'center',
        color: ColorPallete.mediumBlue,
    },
    buttonContainer: {
        height: 100,
        width: '100%',
        marginTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    requestHeading: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: ColorPallete.mediumBlue,
        marginLeft: 10,
    },
    headingView: {
        flexDirection: 'row',
    },
    filter: {
        marginLeft: 270,
    },
    modalContainer: {
        position: 'absolute',
        top: 270, // Adjust as needed
        right: 50, // Adjust as needed
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 999, // Ensure modal is above other elements
    },
    // Add style for each option
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    optionText: {
        marginLeft: 10,
    },
});