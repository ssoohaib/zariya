import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, Alert, Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import ColorPallete from "../../constants/ColorPallete";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swiper from 'react-native-swiper';


export default function AdminRecipientRequestDetails({navigation, route}) {
  const {allDonors} = useContext(AuthContext);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectedNgo = allDonors.find(i=>i.id===route.params.id)

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }

  const switchWithPayload = (screen,screenName)=>{
    navigation.navigate(screen,{
      paymentType:screenName
    })
  }

  const handleAcceptReject = (action) => {
    if (action === 'Accept') {
      Alert.alert('Request Accepted', 'The request has been accepted.');
    } else if (action === 'Reject') {
      Alert.alert('Request Rejected', 'The request has been rejected.');
    }

  };

  const handleProfilePress = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
        <SliderBox 
          images={selectedNgo.causesImages} 
          disableOnPress={true}  
          sliderBoxHeight={260}
          dotColor={ColorPallete.mediumBlue}
          imageLoadingColor={ColorPallete.mediumBlue}
          dotStyle={{
            width:20,
            position:'relative',
            top:-16,
          }}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleLeftContainer}>
            <Text style={styles.title}>{selectedNgo.title}</Text>
            <Text style={styles.address}>{selectedNgo.city}</Text>
            <Text style={styles.address}>{selectedNgo.email}</Text>
            <Text style={styles.address}>{selectedNgo.contactNumber}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.desc}>{selectedNgo.description}</Text>
        <Text style={styles.subtitle}>Causes</Text>
        <View style={styles.causes}>

        {selectedNgo.causes.map((cause, index) => (
          <Text key={index} style={styles.causeItem}>
            {cause}
            {index < selectedNgo.causes.length - 1 && ','}
          </Text>
        ))}
      </View>

      <Pressable style={styles.donateBtn} onPress={handleProfilePress}>
          <Text style={styles.donateBtnTitle}>Verification Documents</Text>
        </Pressable>
        <View style={styles.buttonsContainerx}>
          <Pressable
            style={[styles.donateBtn, { flex: 1, marginRight: 5, marginTop: 1 }]}
            onPress={() => handleAcceptReject('Reject')}
          >
            <Text style={styles.donateBtnTitle}>Reject</Text>
          </Pressable>
          <Pressable
            style={[styles.donateBtn, { flex: 1, marginTop: 1 }]}
            onPress={() => handleAcceptReject('Accept')}
          >
            <Text style={styles.donateBtnTitle}>Accept</Text>
          </Pressable>
        </View>

        {/* <Modal visible={showProfileModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <MaterialIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Swiper style={styles.wrapper} showsButtons={true}>
            {causesImages.map((causesImages, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: causesImages }} style={styles.profilePhoto} />
              </View>
            ))}
          </Swiper>
        </View>
      </Modal> */}

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:ColorPallete.screenBg,

  },
  sliderContainer:{
    // borderRadius:8,
    // overflow:'hidden',

    // borderWidth:1,
    // borderColor:'red'

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  detailsContainer:{
    backgroundColor:ColorPallete.screenBg,
    paddingHorizontal:16,
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    overflow:'hidden',
    
    position:'relative',
    top:-16,

    // borderWidth:1,
    // borderColor:'red'

  },
  causeItem: {
    fontSize: 16,
  },
  buttonsContainerx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleContainer:{
    // borderBottomWidth:3,
    // borderColor:ColorPallete.mediumBlue,
    marginTop:16,  
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    // borderWidth:1,
    // borderColor:'red'
    
  },
  titleLeftContainer:{
    // flexDirection:"row",
    // alignItems:'center',


    // borderWidth:1,
    // borderColor:'red'


  },
  title:{
    fontSize:20,
    fontWeight:'bold',

    // borderWidth:1,
    // borderColor:'red'
  },
  address:{
    color:ColorPallete.lightTextColor,
    fontWeight:'bold',
  },
  subtitle:{
    fontSize:18,
    fontWeight:'bold',
    marginVertical:13,
    marginBottom: 2
    
    
  },
  desc:{
    lineHeight:18,

  },
  causes: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  causeItem: {
    fontSize: 14,
    marginRight: 8, // Add margin between cause items
    marginBottom: 8,
  },
  paymentContainer:{
    borderRadius:8,
    overflow:'hidden',
    backgroundColor:ColorPallete.lightBlue,
    paddingVertical:8,
    marginBottom:8,
    // borderWidth:1,
    // borderColor:'red',
  },
  donateBtn:{
    backgroundColor:ColorPallete.mediumBlue,
    padding:16,
    alignItems:'center',
    borderRadius:8
  },
  donateBtnTitle:{
    color:ColorPallete.screenBg,
    fontSize:18,
  }


})
