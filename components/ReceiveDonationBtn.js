import { View, Text, Pressable, StyleSheet } from 'react-native';
import ColorPallete from '../constants/ColorPallete';

function ReceiveDonationBtn({children, onPress}) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={styles.buttonInnerContainer}
                onPress={onPress} android_ripple={{ color: ColorPallete.lightBlue }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default ReceiveDonationBtn;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: ColorPallete.lightBlue,
        paddingVertical: 12,
        paddingHorizontal: 10,
        elevation: 2,
    },
    buttonText: {
        color: ColorPallete.darkBlue,
        textAlign: 'center',
        fontWeight: 'bold',

    }
});
