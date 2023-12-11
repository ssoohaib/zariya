import { View } from "react-native";
import { StyleSheet, Text } from "react-native";

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Text>Forgot</Text>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})