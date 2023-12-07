import { View, Text, StyleSheet } from "react-native";

export default function RecipientProfile() {
  return (
    <View style={styles.container}>
        <Text>RecipientProfile</Text>
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