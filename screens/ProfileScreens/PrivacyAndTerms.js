import { StyleSheet, Text, View } from 'react-native';

export default function PrivacyAndTerms() {
    return (
      <View style={styles.container}> 
        <Text>PrivacyAndTerms</Text>
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