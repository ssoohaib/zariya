import { Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import ColorPallete from "../constants/ColorPallete";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function HistoryModal(props) {
  
  return (
    <Modal 
      isVisible={props.isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={props.toggleModal}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Select</Text>
          <View style={styles.headerRight}>
            <Pressable onPress={props.toggleModal}>
              <MaterialIcons name={'cancel'} size={24} color={ColorPallete.mediumBlue} />
            </Pressable>
          </View>
        </View>      
        <View style={styles.btnContainer}>
            <Pressable onPress={()=>props.modeHandler('SignUp')} style={[styles.btnPress,{marginRight:8}]}>
                <View style={[styles.btn]}>
                    <Text style={styles.btnText}>Donor</Text>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={'person'} size={24} color={ColorPallete.screenBg} />
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={()=>props.modeHandler('Org')} style={styles.btnPress}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Recipient</Text>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="office-building-outline" size={24} color={ColorPallete.screenBg} />
                    </View>
                </View>
            </Pressable>
        </View>
    </Modal>
  )
}

const styles=StyleSheet.create({
  modalContainer:{ 
    flex:1,
    justifyContent:'flex-start',
    backgroundColor:ColorPallete.screenBg,
    borderRadius:16,
    paddingTop:16, 
    paddingHorizontal:16,
    position:'relative',
    top:"70%",
    margin:0,

  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:16,

  },
  headerText:{
    fontSize:16,
    fontWeight:'bold',
    color:ColorPallete.mediumBlue,

  },
  headerRight:{

  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    color:ColorPallete.screenBg,
    marginBottom:16,

  },
  btnContainer:{
    flexDirection:'row',
  },
  btnPress:{
    flex:1,
    borderRadius:8,
    overflow:'hidden'
    // borderWidth:1,
  },
  btn:{
    padding:8,
    height:100,
    justifyContent:'space-between',
    backgroundColor:ColorPallete.mediumBlue

  },
  btnText:{
    fontWeight:'bold',
    color:ColorPallete.screenBg,

  },
  iconContainer:{
    alignItems:'flex-end'
  }

})
