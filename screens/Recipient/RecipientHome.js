import { FlatList, StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import ImageButton from '../../components/ImageButton';
import ColorPallete from "../../constants/ColorPallete";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import RecipientCard from '../../components/RecipientCard';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getAllUsers } from '../../utilities/AuthFetches';
import {getPendingDonationsCity} from '../../utilities/RecipientFetches'
import { MaterialIcons } from '@expo/vector-icons';

function RecipientHome() {
    const { currentUser, allDonors, token, pendingDonations, setPendingDonationsHandler } = useContext(AuthContext);
    //console.log(currentUser)
    const { title, email, contactNumber, donationsReceived, subscribedUsers, causesImages } = currentUser;
    const [donationsCount, setDonationsCount] = useState(0);
    const [subscribedNgosCount, setSubscribedNgosCount] = useState(0);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [completedRequestsCount, setCompletedRequestsCount] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [filteredRequests, setFilteredRequests] = useState(allDonors); 

    const [trigger, setTrigger]=useState(true)

    useEffect(()=>{
        const fetchPending= async ()=>{
            console.log('lol')

            const result = await getPendingDonationsCity(token, currentUser.city)
            console.log(result)
            setPendingDonationsHandler(result.donations)
        }

        fetchPending()
    },[trigger])

    const triggerHandler=()=>{
    if (trigger)
        setTrigger(false)
    else
        setTrigger(true)
    }


    useEffect(() => {
        setDonationsCount(donationsReceived.length);
        setSubscribedNgosCount(subscribedUsers.length);
        let pendingCount = 0;
        let completedCount = 0;
        let totalAmount = 0; 
        donationsReceived.forEach(donation => {
            if (donation.donation && donation.donation.amount) {
                totalAmount += donation.donation.amount;
            }
            if (donation.donationStatus === 'Pending') {
                pendingCount++;
            } else if (donation.donationStatus === 'Complete') {
                completedCount++;
            }
        });

        setPendingRequestsCount(pendingCount);
        setCompletedRequestsCount(completedCount);
        setTotalDonations(totalAmount); 
    }, [donationsReceived, subscribedUsers]);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const goToSubscribers = () => {
        navigation.navigate('Subscribers'); // Navigate to the Subscribers screen
    };

    const handleFilterOption = (filter) => {
        setSelectedFilter(filter);
        toggleModal(); // Close the modal after selecting the filter
        // Filter requests based on selected filter
        if (filter === 'All') {
            setFilteredRequests(allDonors); // Show all requests
        } else {
            const filteredData = allDonors.filter(request => request.category === filter);
            setFilteredRequests(filteredData);
        }
    };


    const navigation = useNavigation();
    const switchScreenHandler = (screen) => {
        navigation.navigate(screen)
    }

    // console.log(currentUser.causesImages)

    const renderFlatList = (itemData) => {
        if (!itemData)
            return

        // console.log('---',itemData.item.donationCategory)

        return (
            <RecipientCard
                id={itemData.item._id}
                name={itemData.item.donorName}
                items={itemData.item.donation.items}
                //onPress={donationDetail}
                desc={"I am under the water"}
                from={itemData.item.donation.from.slice(0,10)+" ("+itemData.item.donation.from.slice(12,16)+")"}
                till={itemData.item.donation.till.slice(0,10)+" ("+itemData.item.donation.till.slice(12,16)+")"}
                category={itemData.item.donationCategory}
                imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGFfFW95kN-Nxp86JMQWShP3bZ3Wgkgcya9BiYY0a5g&s'}
            />
        )
    }

    return (
        <View>

            {currentUser && <>

                <View style={styles.headerContainer}>
                    <View style={styles.headerUpper}>
                        <View>
                            <Text style={styles.amount}>PKR. {totalDonations.toFixed(2)}</Text>
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
                <View style={[styles.buttonContainer]}>
                    <View style={styles.incomingView}>
                        <Text style={styles.buttonsText}>Incoming Requests</Text>
                        <Text style={styles.dataText}>{pendingRequestsCount}</Text>
                    </View>
                    <View style={styles.addressedView}>
                        <Text style={styles.addresedText}>Addressed Requests</Text>
                        <Text style={styles.addressedData}>{completedRequestsCount}</Text>
                    </View>
                    <TouchableOpacity onPress={goToSubscribers} style={styles.subscriptionView}>
                        <Text style={styles.buttonsText}>Subscribers</Text>
                        <Text style={styles.dataText}>{subscribedNgosCount}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.headingView}>
                    <Text style={styles.requestHeading}>Requests</Text>
                    <TouchableOpacity onPress={toggleModal} style={styles.filter}>
                        <Ionicons name="options" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Pressable style={{alignItems:"center", marginBottom:8}} onPress={triggerHandler}>
                    <MaterialIcons name="refresh" size={24} color="black" />
                </Pressable>

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

                {/* Render requests or "No current requests" image and text */}
                {pendingDonations && pendingDonations.length > 0 ? (
                    <FlatList
                        data={pendingDonations}
                        keyExtractor={(item) => item._id}
                        renderItem={renderFlatList}
                        contentContainerStyle={styles.flatListContentContainer}
                    />
                ) : (
                    <View style={styles.noRequestsContainer}>
                        <Image source={require('../../assets/images/no-data.png')} style={styles.noRequestsImage} />
                        <Text style={styles.noRequestsText}>No current requests</Text>
                    </View>
                )}
            </>}


        </View>
    )
}

export default RecipientHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEE1E0',
        flex: 1,
    },
    flatListContentContainer: {
        flexGrow: 1, // Allow the FlatList content to grow and scroll
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
    noRequestsContainer: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRequestsImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    noRequestsText: {
        fontSize: 14,
        color: '#999999'
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
        // width: '100%',
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    requestHeading: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: ColorPallete.mediumBlue,
        // marginLeft: 10,
    },
    headingView: {
        flexDirection: 'row',
        // borderWidth:  1,

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
