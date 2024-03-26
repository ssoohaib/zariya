import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

function RecipientCard({id, onPress, title, email, causesImages, recipientApproval, logo}) {    

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>onPress(id)}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image} source={{ uri: logo }} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{title}</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Text style={styles.email}>Email: {email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </Pressable>
        </View>
    )
}

export default RecipientCard;

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
    onHold: {
        fontSize: 14,
        color: 'red',
        marginLeft: 7
    },
});
