import { StyleSheet, Text, View } from 'react-native';

export default function MedicineDonationScreen() {
    return (
      <View style={styles.container}> 
        <Text>MedicineDonationScreen</Text>
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