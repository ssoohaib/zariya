import { View, Text, StyleSheet } from "react-native";

export default function RecipientNotification() {
  return (
    <View style={styles.container}>
        <Text>RecipientNotification</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})