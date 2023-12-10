import { Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import ColorPallete from "../constants/ColorPallete";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HISTORY } from '../dummy_data/dummy_data';
import IconButton from './IconButton';
import ImprovButton from './ImprovButton';

export default function HistoryModal(props) {

  const selectedHistory=HISTORY.find(i=>i.id==props.id)

  let icon='';
    let desc=''
    if (selectedHistory.donationType=="Food"){
        icon = "food-fork-drink"
        desc="Servings: "
    }
    else if (selectedHistory.donationType=="Medicine"){
        icon = "medical-bag"
        desc="Quantity: "
    }
    else if (selectedHistory.donationType=="Ration"){
        icon = "food-variant"
        desc="Weight: "
    }
    else if (selectedHistory.donationType=="Clothes"){
        icon = "tshirt-crew"
        desc="Items: "
    }
    else if (selectedHistory.donationType=="Monetary"){
        icon = "cash"
        desc="Amount: "
    }
  
  return (
    <Modal 
      isVisible={props.isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={props.toggleModal}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name={icon} size={24} color={ColorPallete.mediumBlue} />
          </View>
          <Text style={styles.headerText}>{selectedHistory.puid}</Text>
          <View style={styles.headerRight}>
            <Pressable onPress={props.toggleModal}>
              <MaterialIcons name={'cancel'} size={24} color={ColorPallete.lightBlueTwo} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.title}>{selectedHistory.title}</Text>
        <View style={styles.row}>
          <Text style={styles.c1}>Category</Text>
          <Text style={styles.c2}>{selectedHistory.donationType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.c1}>Type</Text>
          <Text style={styles.c2}>{'Subscription'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.c1}>Duration</Text>
          <Text style={styles.c2}>{'Monthly'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.c1}>Amount</Text>
          <Text style={styles.c2}>{'Rs. 5000'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.c1}>Status</Text>
          <Text style={styles.c2}>{selectedHistory.status}</Text>
        </View>
        <Text style={styles.date}>{selectedHistory.date}</Text>
        <View style={styles.btn}>
          <ImprovButton
            icon={'delete'}
            iconColor={'red'}
            style={{
              backgroundColor:ColorPallete.mediumBlue, 
              borderWidth:1, 
              marginRight:8,
              borderColor:'red',
              padding:11,
            }}
          />
          <ImprovButton
            title={'Donate Again'}
            container={{flex:1, }}
            titleStyle={{textAlign:'center', }}
          />
        </View>
      

      
    </Modal>
  )
}

const styles=StyleSheet.create({
  modalContainer:{ 
    flex:1,
    justifyContent:'flex-start',
    backgroundColor:ColorPallete.mediumBlue,
    borderRadius:16,
    paddingTop:16, 
    paddingHorizontal:16,
    position:'relative',
    top:"55%",
    margin:0,

  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:16,

  },
  headerLeft:{
    backgroundColor:ColorPallete.lightBlueTwo,
    padding:8,
    borderRadius:8,
  },
  headerText:{
    fontSize:18,
    fontWeight:'bold',
    color:ColorPallete.lightBlueTwo,
  },
  headerRight:{

  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    color:ColorPallete.screenBg,
    marginBottom:16,

  },
  row:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:8,

  },
  c1:{
    color:ColorPallete.screenBgTwo,

  },
  c2:{
    fontSize:16,
    fontWeight:'bold',
    color:ColorPallete.lightBlueTwo,
  },
  date:{
    fontWeight:'bold',
    textAlign:"right",
    color:ColorPallete.screenBgTwo,
    marginBottom:8,

  },
  btn:{
    marginVertical:8,
    flexDirection:"row",
    alignItems:'center',

    // borderWidth:1


  }


})
