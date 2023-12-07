import { StyleSheet, Text, View } from 'react-native';

export default function Verification() {
    return (
      <View style={styles.container}> 
        <Text>Verification</Text>
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