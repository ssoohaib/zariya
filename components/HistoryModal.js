import { Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import ColorPallete from "../constants/ColorPallete";
import { MaterialIcons } from '@expo/vector-icons';



export default function HistoryModal(props) {

    const close = ()=>{
      props.toggleModal()
    }

  return (
    <Modal 
      isVisible={props.isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={props.toggleModal}
      >
      
        <Pressable onPress={props.toggleModal}>
            <MaterialIcons name="cancel" size={24} color={ColorPallete.lightBlueTwo} />
        </Pressable>

      
    </Modal>
  )
}

const styles=StyleSheet.create({
  modalContainer:{ 
    backgroundColor:ColorPallete.mediumBlue, 
    borderRadius:16,
    paddingTop:8,
    paddingHorizontal:16,
    position:'relative',
    top:"32%",
    margin:0,

  },
})
