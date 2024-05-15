import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, Modal, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { DonationList } from '../../dummy_data/recipient_data';
import DonationCard from '../../components/DonationCard';
import ColorPallete from '../../constants/ColorPallete';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import AcceptBtn from '../../components/AcceptBtn';
import SendNotifications from '../../utilities/SendNotifications';

function DonationsList({ route }) {
    const navigation = useNavigation(); 

    const [isModalVisible, setModalVisible] = useState(false);
    const [riderName, setRiderName] = useState('');
    const [riderContact, setRiderContact] = useState('');
    const [donationId, setDonationId] = useState(null);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isContactValid, setIsContactValid] = useState(true);
    const [nameError, setNameError] = useState('');
    const [contactError, setContactError] = useState('');
    const slider = useRef(null);
   

    // const navigation = useNavigation();
    const switchScreenHandler = (screen) => {
        navigation.navigate(screen)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAccept = () => {
        // console.log(props.id)
        // setDonationId(props.id);
        toggleModal();
    };

    const handleClose = () => {
        setNameError('');
        setContactError('');
        setIsNameValid(true);
        setIsContactValid(true);
        setModalVisible(false);
    };

    // useEffect(() => {
    //   if (contactError === '') {
    //     toggleModal();
    //   }
    // }, [contactError]);

    const handleSubmit = () => {
        const nameValid = !!riderName.trim();
        const contactValid = !!riderContact.trim();

        setIsNameValid(nameValid);
        setIsContactValid(contactValid);

        if (!nameValid) {
        setNameError('Name is required');
        } else {
        setNameError('');
        }

        if (!contactValid) {
        setContactError('Phone No. is required');
        } else if (!/^\+\d{8,15}$/.test(riderContact.trim())) {
        setContactError('Phone number is incorrect.');
        } else {
        setContactError('');
        }
        if (nameValid && contactValid) {
            toggleModal();

            navigation.navigate('Congratulations',{
                donationId:route.params.donationId,
                riderName: riderName,
                riderContact: riderContact,
            });

            SendNotifications('Donation Accepted', 'You successfully accepted the donation.', {lol:'lol'})
        }
    };

    const renderDonationCard = (item) => {
        if(!item)
            return
        
            // console.log(route.params.category)
        
        return (
            <DonationCard
                id={item.item.title}
                title={item.item.title}
                item={item.item}
                category={route.params.category}
                // desc={'item.description'}
                imageUrl={'https://banner2.cleanpng.com/20180524/oct/kisspng-computer-icons-n-a-clip-art-not-vector-5b071412f17ef2.9578675815271905469892.jpg'}
            />
    )};

    const goBackToRecipientHome = () => {
        navigation.goBack();
    };

    const goToDonationDetail = () => {
        navigation.navigate('DonationDetail'); 
    };

    return (
        <View style={{backgroundColor:ColorPallete.screenBg, flex:1}}>
            <View style={styles.icon}>
                <Pressable onPress={goBackToRecipientHome}>
                    <Ionicons name="chevron-back" size={26} color="#453953" />
                </Pressable>
                <Text style={styles.heading}>List of Items</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.listContainer}>
                    <FlatList
                        data={route.params.items}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDonationCard}
                    />
                </View>
            </View>
            <View style={[styles.btn]}>
                <AcceptBtn onPress={handleAccept}>Accept</AcceptBtn>
            </View>

            {/* Rider Details Modal */}
            {isModalVisible && (
                <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
                >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
                    <Ionicons name="close" size={30} color={ColorPallete.darkBlue} />
                    </TouchableOpacity>
                    <Text style={styles.modalHeading}>Fill Rider's Details</Text>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={[styles.input, !isNameValid && styles.inputError]}
                        placeholder="Ligma"
                        placeholderTextColor={'#B2B1B0'}
                        onChangeText={(text) => setRiderName(text)}
                    />
                    {!isNameValid && <Text style={styles.errorText}>{nameError}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone No.</Text>
                    <TextInput
                        style={[styles.input, !isContactValid && styles.inputError]}
                        placeholder="+923055178654"
                        placeholderTextColor={'#B2B1B0'}
                        // keyboardType='phone-pad'
                        onChangeText={(text) => setRiderContact(text)}
                    />
                    {!isContactValid && (
                        <Text style={[styles.errorText, styles.inputError]}>
                        {contactError !== '' ? contactError : 'Phone number is incorrect.'}
                        </Text>
                    )}
                    </View>

                    <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                    >
                    <Text style={styles.modalButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </Modal>
            )}
        </View>
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
    btn: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 30,
      },
      modalContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0EFEF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        overflow: 'hidden',
      },
      modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        //marginBottom: 20,
        color: ColorPallete.darkBlue,
      },
      input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 3,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: '#9F9E9D',
      },
      modalButton: {
        backgroundColor: ColorPallete.darkBlue,
        padding: 10,
        height: 40,
        width: 150,
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 20,
      },
      modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      label: {
        color: '#9F9E9D',
        marginBottom: 3,
        marginTop: 20,
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      inputError: {
        borderColor: 'red',
      },
      errorText: {
        color: 'red',
        fontSize: 10,
        //marginTop: 3,
      },
      inputErrorText: {
        color: 'red',
        marginTop: 5,
      },
      backButton: {
        position: 'absolute',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 70,
        zIndex: 1, // Ensure the icon is rendered above other components
      },
});
