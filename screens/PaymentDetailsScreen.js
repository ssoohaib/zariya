import { StyleSheet, Text, View } from 'react-native';

export default function PaymentDetailsScreen({route}) {
    return (
      <View style={styles.container}> 
        <Text>{route.params.paymentType}</Text>
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