
import { StyleSheet, Text, View } from 'react-native';

export default function DonorRequestScreen() {
    return (
      <View style={styles.container}> 
        <Text>DonorRequestScreen</Text>
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