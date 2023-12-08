
import { StyleSheet, Text, View } from 'react-native';

export default function FeedbackScreen() {
    return (
      <View style={styles.container}> 
        <Text>DonorFeedbackScreen</Text>
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