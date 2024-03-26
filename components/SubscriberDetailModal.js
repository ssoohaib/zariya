import {
    Button,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Modal from "react-native-modal";
import ColorPallete from "../constants/ColorPallete";
import { useContext } from "react";
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function SubscriberDetailModal(props) {
    const { currentUser } = useContext(AuthContext);

    const selectedSubscriber = currentUser.subscribedUsers.find(
        (i) => i.id == props.id
    );


    return (
        <Modal
            isVisible={props.isModalVisible}
            style={[styles.modalContainer, { justifyContent: 'flex-end' }]}
            onBackdropPress={props.toggleModal}
        >
            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <Pressable onPress={props.toggleModal}>
                        <MaterialIcons
                            name={'cancel'}
                            size={24}
                            color={ColorPallete.screenBg}
                        />
                    </Pressable>
                </View>
                <View style={styles.userInfo}>
                    <Image
                        style={styles.image}
                        source={require('../../zariya/assets/images/user2.png')}
                    />
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{selectedSubscriber.donorName}</Text>
                        <Text style={styles.subTitle}>Lahore Pakistan</Text>
                        <Text style={styles.subTitle}>03047195249</Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <View style={styles.detailRow}>
                        <Text style={styles.leftAlignedText}>Amount:</Text>
                        <Text style={styles.rightAlignedText}>Rs. 2000</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.leftAlignedText}>Type:</Text>
                        <Text style={styles.rightAlignedText}>{selectedSubscriber.duration}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.leftAlignedText}>Mode of Payment:</Text>
                        <Text style={styles.rightAlignedText}>Jazzcash</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.leftAlignedText}>Causes:</Text>
                        <Text style={styles.rightAlignedText}>{selectedSubscriber.causes}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
    },
    modalContent: {
        backgroundColor: ColorPallete.mediumBlue,
        borderRadius: 16,
        padding: 16,
    },
    header: {
        alignSelf: 'flex-end',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 85,
        width: 85,
        borderRadius: 42,
    },
    userInfoText: {
        marginLeft: 16,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ColorPallete.screenBg,
    },
    subTitle: {
        color: ColorPallete.screenBgTwo,
        fontWeight: 'bold',
    },
    details: {
        marginTop: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    leftAlignedText: {
        fontWeight: 'bold',
        color: ColorPallete.screenBgTwo,
    },
    rightAlignedText: {
        fontWeight: '300',
        color: ColorPallete.screenBgTwo,
    },
});