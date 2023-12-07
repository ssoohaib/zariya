import { StyleSheet, Text } from "react-native"

export default function AlertText(props) {
  return (
    <Text style={styles.text}>{props.text}</Text>
  )
}

const styles=StyleSheet.create({
    text:{
        color:"red",
        fontWeight:'bold',
    }
})
