import { StyleSheet, Text, View } from "react-native";

export default function OnHold() {
  return (
    <View style={styles.container}>
        <Text>Your account is on hold for further verification.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})