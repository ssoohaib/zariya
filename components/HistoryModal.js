import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import ColorPallete from "../constants/ColorPallete";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HISTORY } from "../dummy_data/dummy_data";
import IconButton from "./IconButton";
import ImprovButton from "./ImprovButton";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HistoryModal(props) {
  const { currentUser } = useContext(AuthContext);

  const selectedHistory = currentUser.donationsMade.find(
    (i) => i.id == props.id
  )

  const currentCategory=selectedHistory.donationCategory

  let icon = "";
  let desc = "";
  if (selectedHistory.donationCategory == "Food") {
    icon = "food-fork-drink";
    desc = "Servings: ";
  } else if (selectedHistory.donationCategory == "Medicine") {
    icon = "medical-bag";
    desc = "Quantity: ";
  } else if (selectedHistory.donationCategory == "Ration") {
    icon = "food-variant";
    desc = "Weight: ";
  } else if (selectedHistory.donationCategory == "Clothes") {
    icon = "tshirt-crew";
    desc = "Items: ";
  } else if (selectedHistory.donationCategory == "Monetary") {
    icon = "cash";
    desc = "Amount: ";
  }

  const renderFlatListItems = (itemData) => {

    return(
      <View style={{ width:140, justifyContent:'center', padding: 8, marginRight:8, borderWidth:1, borderRadius:8, borderStyle:"dashed"}}>
        <View style={styles.row}>
          <Text style={styles.c1}>Item</Text>
          <Text style={styles.c2}>{itemData.item.title.slice(0,8)}</Text>
        </View>
        {
          currentCategory==="Food" && 
          <>
            <View style={styles.row}>
              <Text style={styles.c1}>Type</Text>
              <Text style={styles.c2}>{itemData.item.type}</Text>
            </View>
            <View style={[styles.row, {marginBottom:0}]}>
              <Text style={styles.c1}>Serv</Text>
              <Text style={styles.c2}>{itemData.item.servings}</Text>
            </View>
          </>
        }
        {
          currentCategory==="Clothes" &&
          <>
            <View style={styles.row}>
              <Text style={styles.c1}>Size</Text>
              <Text style={styles.c2}>{itemData.item.size}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.c1}>Gender</Text>
              <Text style={styles.c2}>{itemData.item.gender}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.c1}>Quantity</Text>
              <Text style={styles.c2}>{itemData.item.quantity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.c1}>Season</Text>
              <Text style={styles.c2}>{itemData.item.season}</Text>
            </View>
          </>
        }
        {
          currentCategory==="Ration" &&
          <View style={[styles.row, {marginBottom:0}]}>
            <Text style={styles.c1}>Quantity</Text>
            <Text style={styles.c2}>{itemData.item.quantity}</Text>
          </View>
        }
      </View>  
    )
  }

  return (
    <Modal
      isVisible={props.isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={props.toggleModal}
    >
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={ColorPallete.screenBg}
          />
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={props.toggleModal}>
            <MaterialIcons
              name={"cancel"}
              size={24}
              color={ColorPallete.mediumBlue}
            />
          </Pressable>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {selectedHistory.donationCategory === "Monetary"? "Money" : selectedHistory.donationCategory}
          {" donated to "}
        {selectedHistory.ngoName}
      </Text>

      {/* Monetary Details */}
      {selectedHistory.donationCategory === "Monetary" && (
        <>
          <View style={styles.row}>
            <Text style={styles.c1}>Type</Text>
            <Text style={styles.c2}>{selectedHistory.donation.type}</Text>
          </View>

          {selectedHistory.donation.type !== "One Time" && (
            <View style={styles.row}>
              <Text style={styles.c1}>Duration</Text>
              <Text style={styles.c2}>{selectedHistory.donation.duration}</Text>
            </View>
          )
          }
          <View style={styles.row}>
            <Text style={styles.c1}>Amount</Text>
            <Text style={styles.c2}>{selectedHistory.donation.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.c1}>Medium</Text>
            <Text style={styles.c2}>{selectedHistory.donation.paidThrough}</Text>
          </View>
          <View style={{alignItems:'flex-end', marginTop:8, marginBottom:16}}>
            <View style={{width:150, borderWidth:1, borderStyle:'dashed', borderColor:ColorPallete.mediumBlue}}></View>
          </View>
          <View style={styles.row}>
            <Text style={styles.c1}>Causes</Text>
            <Text style={styles.c2}>{selectedHistory.donation.causes.map(i=>' '+i)}</Text>
          </View>
        </>
      )}

      {
        selectedHistory.donationCategory !== "Monetary" &&
        <View style={{marginBottom:8, alignItems:'center'}}>
          <FlatList 
            data={selectedHistory.donation.items}
            keyExtractor={i=>i.title}
            horizontal={true}
            renderItem={renderFlatListItems}
          />
        </View>
      }

      {/* Common */}
      <View style={styles.row}>
        <Text style={styles.c1}>Status</Text>
        <Text style={styles.c2}>{selectedHistory.donationStatus}</Text>
      </View>


      {/* Dates */}
      {
        selectedHistory.donationCategory === "Monetary"?
          <View style={styles.row}>
            <Text style={styles.c1}>Date</Text>
            <Text style={styles.c2}>{selectedHistory.donationDate.slice(0,10)}</Text>
          </View>
          :
          <>
          <View style={styles.row}>
            <Text style={styles.c1}>From</Text>
            <Text style={styles.c2}>{selectedHistory.donation.from.slice(0,10)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.c1}>Till</Text>
            <Text style={styles.c2}>{selectedHistory.donation.from.slice(0,10)}</Text>
          </View>
          </>
      }

      <View style={styles.btn}>
        <ImprovButton
          title={"Donate Again"}
          container={{ flex: 1}}
          titleStyle={{ textAlign: "center", color: ColorPallete.screenBg }}
          style={{
            backgroundColor: ColorPallete.mediumBlue,
            borderRadius:8
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: ColorPallete.screenBg,
    // backgroundColor:ColorPallete.mediumBlue,
    borderRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    position: "relative",
    top: "48%",
    margin: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    backgroundColor: ColorPallete.mediumBlue,
    padding: 8,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorPallete.mediumBlue,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorPallete.mediumBlue,
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  c1: {
    color: ColorPallete.mediumBlue,
  },
  c2: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorPallete.mediumBlue,
  },
  date: {
    fontWeight: "bold",
    textAlign: "right",
    color: ColorPallete.lightTextColor,
    marginBottom: 8,
  },
  btn: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",

    // borderWidth:1
  },
});
