import { StyleSheet, Text, View } from 'react-native';

export default function FoodDonationScreen() {
    return (
      <View style={styles.container}> 
        <Text>FoodDonationScreen</Text>
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