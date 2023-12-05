import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import { Ionicons } from '@expo/vector-icons';

import ColorPallete from '../constants/ColorPallete'

function RecipientCard(props) {
    return (
        <View style={styles.container}>
            <Pressable>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image}
                                source={{uri:props.imageUrl}} />
                            <View style={styles.nameTimeDescContainer}>
                                <View style={styles.nameTimeContainer}>
                                    <Text style={styles.name}>{props.name}</Text>
                                    <Text style={styles.time}>{props.time}</Text>
                                </View>
                                <Text style={styles.category}>{props.category}</Text>
                                <Text style={styles.desc}>{props.desc.slice(0,90)}...</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <Text style={styles.quantityText}>5 person</Text>
                        <View style={styles.call}>
                            <Ionicons
                                name='call' size={20}
                                color={ColorPallete.darkBlue}
                            />
                        </View>
                        <IconButton
                            title={'Accept'}
                            bgColor={ColorPallete.mediumBlue}
                            iconColor={ColorPallete.screenBg}
                            style={{ flex: 1, height: '100%' }}
                            textStyle={{ fontSize: 15 }}
                        />
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
        marginBottom: 5,
        backgroundColor: 'white',
        width: '100%',
    },
    innerContainer: {
       margin: 10,
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
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    time: {
        fontWeight: 'bold',
        marginLeft: 140, 
    },
    category: {
        fontWeight: '400',
        //marginTop: 2,
    },
    desc: {
        fontSize: 12,
        lineHeight: 15,
        marginTop: 5,
        fontWeight: '200',
        marginBottom: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center', 
    },
    call: {
        borderRadius: 5,
        backgroundColor: ColorPallete.lightBlue,
        marginRight: 10, 
        padding: 8, 
        marginLeft: 150,
    },
    btn: {
        borderRadius: 8,
        width: 40,
    },
    quantityText: {
        fontWeight: '100',
        marginLeft: 10,
        marginTop: 15,
        fontSize: 12,
    },

})