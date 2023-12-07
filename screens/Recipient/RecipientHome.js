import RecipientAnalyticCard from "../../components/RecipientAnalyticCard";
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import ImageButton from '../../components/ImageButton';
import ColorPallete from "../../constants/ColorPallete";
import { Analytics } from "../../dummy_data/recipient_analytics";
import ReceiveDonationBtn from "../../components/ReceiveDonationBtn";
import { useNavigation } from '@react-navigation/native';

function RecipientHome() {
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
            <RecipientAnalyticCard
                id={itemData.item.id}
                category={itemData.item.category}
                money={itemData.item.money}
                icon={itemData.item.icon}
                arrow={itemData.item.arrow}
                percent={itemData.item.percent}
            />
        )
    }

    return (
        <ScrollView>
            <View style={styles.headerContainer}>
                <View style={styles.headerUpper}>
                    <View>
                        <Text style={styles.amount}>PKR. 79,865.40</Text>
                        <Text style={styles.headerText}>Donations Received</Text>
                    </View>
                    <View style={styles.userContainer}>
                        <View style={styles.userTextContainer}>
                            <Text style={styles.userGreet}>Hi,</Text>
                            <Text style={styles.userName}>Ligma</Text>
                        </View>
                        <ImageButton
                            style={styles.userImage}
                            onPress={switchScreenHandler}
                            screen={'Profile'}
                        />
                    </View>
                </View>
                <View style={styles.lowerHeader}>
                    <ReceiveDonationBtn onPress={recipientMainScreenHandler}>Receive Donations</ReceiveDonationBtn>
                </View>
            </View>
            <View >
                <View >
                    <Text style={styles.subtitle}>Analytics</Text>
                    <Text style={styles.day}> Today </Text>
                </View>
                <View style={styles.analyticContainer}>
                    <FlatList
                        data={Analytics}
                        keyExtractor={(item) => item.id}
                        renderItem={renderFlatList}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Text style={styles.day}> Yesterday </Text>
                <View style={styles.analyticContainer}>
                    <FlatList
                        data={Analytics}
                        keyExtractor={(item) => item.id}
                        renderItem={renderFlatList}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default RecipientHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEE1E0',
    },
    headerContainer: {
        paddingTop: 48,
        paddingBottom: 30,
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
});