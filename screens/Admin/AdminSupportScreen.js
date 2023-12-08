
import { StyleSheet, Text, View } from 'react-native';

export default function AdminSupportScreen() {
    return (
      <View style={styles.container}> 
        <Text>AdminSupportScreen</Text>
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