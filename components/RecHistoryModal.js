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
  
    const selectedHistory = currentUser.donationsReceived.find(
      (i) => i.id == props.id
    );
  
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
  
    return (
      <Modal
        isVisible={props.isModalVisible}
        style={styles.modalContainer}
        onBackdropPress={props.toggleModal}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={ColorPallete.screenBg}
            />
          </View>
          {/* <Text style={styles.headerText}>lol</Text> */}
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
  
        <Text style={styles.title}>
          {selectedHistory.donationCategory +
            " donated by " +
            selectedHistory.donorName}
        </Text>
  
        {/* <View style={styles.row}>
          <Text style={styles.c1}>Category</Text>
          <Text style={styles.c2}>{selectedHistory.donationCategory}</Text>
        </View> */}
  
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
            <Text style={{textAlign:"right"}}>-------------------------</Text>
            <View style={styles.row}>
              <Text style={styles.c1}>Causes</Text>
              <Text style={styles.c2}>{selectedHistory.donation.causes.map(i=>' '+i)}</Text>
            </View>
          </>
        )}
  
        <View style={styles.row}>
          <Text style={styles.c1}>Status</Text>
          <Text style={styles.c2}>{selectedHistory.donationStatus}</Text>
        </View>
        <Text style={styles.date}>{selectedHistory.donationDate.slice(0,10)}</Text>
        <View style={styles.btn}>
          <ImprovButton
            icon={"delete"}
            iconColor={ColorPallete.screenBg}
            style={{
              backgroundColor: ColorPallete.mediumBlue,
              // borderWidth:1,
              marginRight: 8,
              borderRadius:8,
              borderColor: "red",
              padding: 11,
            }}
          />
          {/* <ImprovButton
            title={"Donate Again"}
            container={{ flex: 1}}
            titleStyle={{ textAlign: "center", color: ColorPallete.screenBg }}
            style={{
              backgroundColor: ColorPallete.mediumBlue,
              borderRadius:8
            }}
          /> */}
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
    headerRight: {},
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
  