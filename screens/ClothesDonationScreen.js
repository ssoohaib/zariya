import { StyleSheet, Text, View } from 'react-native';

export default function ClothesDonationScreen() {
    return (
      <View style={styles.container}> 
        <Text>ClothesDonationScreen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});