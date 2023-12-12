import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

function SupportCard(props) {

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>props.onPress(props.id)}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image}
                                source={{ uri: props.imageUrl }} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{props.name}</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Text style={styles.email}>Time: {props.time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </Pressable>
        </View>
    )
}

export default SupportCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: 5,
        marginTop:6,
        backgroundColor: 'white',
        width: '100%',
        borderRadius:35
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
