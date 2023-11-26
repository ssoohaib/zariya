import { StyleSheet, Text, View } from 'react-native';

export default function SearchScreen() {
    return (
      <View style={styles.container}> 
        <Text>SearchScreen</Text>
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