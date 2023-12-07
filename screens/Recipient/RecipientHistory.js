import { View, Text, StyleSheet } from "react-native";

export default function RecipientHistory() {
  return (
    <View style={styles.container}>
        <Text>RecipientHistory</Text>
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