import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import ColorPallete from "../constants/ColorPallete";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useContext, useState } from "react";
import PaymentModal from "../components/PaymentModal";
import { AuthContext } from "../context/AuthContext";
import SendNotifications from "../utilities/SendNotifications";
const {toggleFav} = require('../utilities/DonorApis')

export default function NgoDetailsScreen({navigation, route}) {
  const {allRecipients, currentUser, token, modifyCurrentUser} = useContext(AuthContext);
  const [selectedCauses, setSelectedCauses] = useState([]);

  const [isCauseEmpty, setIsCauseEmpty] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false);
  
  const selectedNgo = allRecipients.find(i=>i._id===route.params.id)
  const isFav = currentUser.favouriteNgos.find(id=>id===selectedNgo._id) ? true : false

  const handleToggleFav = async ()=>{
    const isFav=currentUser.favouriteNgos.find(id=>id===selectedNgo._id)
    if (isFav){
        const newFavList=currentUser.favouriteNgos.filter(id=>id!==selectedNgo._id)
        modifyCurrentUser({
            ...currentUser,
            favouriteNgos:newFavList
        })
        
    }else{
        modifyCurrentUser({
            ...currentUser,
            favouriteNgos:[...currentUser.favouriteNgos, selectedNgo._id]
        })
    }
    const result = await toggleFav(token, currentUser._id, selectedNgo._id)
  }

  const toggleModal = () => {
    if (causesValidation()){
      setIsCauseEmpty(true)
      return
    }else {
      setIsCauseEmpty(false)
    }
    
    setModalVisible(!isModalVisible);
  };

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }

  const switchWithPayload = (screen,screenName)=>{
    navigation.navigate(screen,{
      paymentType:screenName
    })
  }

  const causesValidation = () =>{
    if (selectedCauses.length === 0){
      setIsCauseEmpty(true)
      return true
    }else {
      setIsCauseEmpty(false)
      return false
    }
  }

  const paymentSuccessHandler = (data)=>{
    navigation.goBack()
    SendNotifications('Payment Success', 'Your payment was successful', {lol:'lol'})
    // navigation.navigate('PaymentSuccess',data)
  }

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
          </View>
          <Pressable onPress={handleToggleFav}>
            {
              isFav === true ? 
              <MaterialCommunityIcons name={'star'} size={24} color={ColorPallete.mediumBlue} />
              :<MaterialCommunityIcons name={'star-outline'} size={24} color={ColorPallete.mediumBlue} />
            }
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.desc}>{selectedNgo.description}</Text>
        <View style={styles.causes}>
          <MultipleSelectList 
            setSelected={(val) => setSelectedCauses(val)} 
            data={selectedNgo.causes} 
            save="value"
            placeholder="Select Causes"
            search={false}
            label="Causes"
          />
        </View>
        {isCauseEmpty && <Text style={{color:'red', marginBottom:8}}>Please select at least one cause</Text>}
        <Pressable onPress={toggleModal} style={styles.donateBtn}>
          <Text style={styles.donateBtnTitle}>Donate</Text>
        </Pressable>        
        <PaymentModal data={{
          userName:currentUser.firstName+' '+currentUser.lastName,
          ngoName:selectedNgo.title,
          causes:selectedCauses,
        }} isModalVisible={isModalVisible} toggleModal={toggleModal} switchWithPayload={switchWithPayload} paymentSuccessHandler={paymentSuccessHandler} />

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
  titleContainer:{
    // borderBottomWidth:3,
    // borderColor:ColorPallete.mediumBlue,
    marginTop:16, 
    marginBottom:8, 
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
    fontSize:16,
    fontWeight:'bold',
    marginVertical:16,
    
    
  },
  desc:{
    lineHeight:18,
    // fontSize:15,

  },
  causes:{
    marginTop:16,
    marginBottom:8,
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
    justifyContent:'center',
    borderRadius:8
  },
  donateBtnTitle:{
    color:ColorPallete.screenBg,
    fontSize:18,
  }


})
