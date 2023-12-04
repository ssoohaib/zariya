import { StyleSheet, Text, View } from 'react-native';

export default function DonorProfileScreen() {
    return (
      <View style={styles.container}> 
        <Text>DonorProfileScreen</Text>
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