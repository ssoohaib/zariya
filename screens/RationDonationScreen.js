import { StyleSheet, Text, View } from 'react-native';

export default function RationDonationScreen() {
    return (
      <View style={styles.container}> 
        <Text>RationDonationScreen</Text>
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