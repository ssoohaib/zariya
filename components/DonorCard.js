import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

function DonorCard({navigation, id, firstName, lastName, contactNumber, email}) {

    const switchScreenHandler = () =>{
        navigation.navigate("AdminDonorScreen", {
            id: id,
            firstName: firstName,
            lastName: lastName,
            // photo: props.imageUrl,
            email: email,
            contactNumber: contactNumber,
            // donationsMade: props.donationsMade
        });
    }
    

    return (
        <View style={styles.container}>
            <Pressable onPress={switchScreenHandler}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            {/* <Image style={styles.image} source={{ uri: props.imageUrl }} /> */}
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{firstName} {lastName}</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Text style={styles.email}>Email: {email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </Pressable>
            {/* <DonorInfoModal id={props.id} isModalVisible={isModalVisible} toggleModal={toggleModal} switchWithPayload={switchWithPayload}
                userData={{
                    firstName: props.firstName,
                    lastName: props.lastName,
                    email: props.email,
                    contactNumber: props.contactNumber,
                    imageUrl: props.imageUrl,
                    status: props.status,
                }}
            /> */}
        </View>
    )
}

export default DonorCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 4,
        // marginTop:6,
        backgroundColor: '#f5f5f5',
        // width: '97%',
        borderRadius:8,
        // marginLeft:7
    },
    innerContainer: {
        margin: 10,
        marginTop: 10
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
