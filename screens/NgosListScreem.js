import { StyleSheet, Text, View } from 'react-native';

export default function NgosListScreen() {
    return (
      <View style={styles.container}> 
        <Text>NgosListScreen</Text>
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