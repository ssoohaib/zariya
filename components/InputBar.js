import { StyleSheet, View, TextInput } from "react-native";
import IconButton from "./IconButton";
import searchTerm from "../screens/Admin/SearchDonorScreen"
import onChangeText from "../screens/Admin/SearchDonorScreen"


export default function InputBar(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={styles.input}
        placeholder={props.placeHolder}
        placeholderTextColor={'white'}
        value={props.searchTerm} 
        onChangeText={props.onChangeText} 
      />

      {props.icon &&
        <IconButton
          icon={props.icon}
          bgColor={props.bgColor}
          iconColor={props.iconColor}
          style={{
            flex: 0,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRadius: 0,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderColor: 'white',
            justifyContent: 'center'
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderColor: 'white',
    color: 'white',
  },
  icon: {},
});
