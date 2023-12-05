import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { NGOS } from "../dummy_data/dummy_data";
import ColorPallete from "../constants/ColorPallete";
import IconButton from "../components/IconButton";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import PaymentModal from "../components/PaymentModal";


export default function NgoDetailsScreen({navigation, route}) {
  const [selectedCauses, setSelectedCauses] = useState([]);
  const selectedNgo = NGOS.find(i=>i.id===route.params.id)

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
        <SliderBox 
          images={selectedNgo.images} 
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
            {/* <Image style={styles.logo} source={{uri:selectedNgo.logo}}/> */}
            <Text style={styles.title}>{selectedNgo.title}</Text>
            <Text style={styles.address}>{selectedNgo.contact.city}, {selectedNgo.contact.country}</Text>
            
          </View>
          <IconButton 
            icon={'star'} 
            // bgColor={ColorPallete.lightBlue} 
            iconColor={ColorPallete.mediumBlue}
            style={{flex:0,borderWidth:1,borderColor:ColorPallete.mediumBlue}}
        />
        </View>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.desc}>{selectedNgo.desc}</Text>
        <View style={styles.causes}>
          <MultipleSelectList 
            setSelected={(val) => setSelectedCauses(val)} 
            data={selectedNgo.causes} 
            save="value"
            placeholder="Select Causes"
            search={false}
            // closeicon={<MaterialIcons name="close" color={'black'} size={24} />}
            // onSelect={() => alert(selectedCauses)} 
            label="Causes"
          />
        </View>

        <IconButton 
          title={'Donate'} 
          bgColor={ColorPallete.mediumBlue} 
          // icon={'arrow-right-thin'}
          iconColor={ColorPallete.screenBg}
          style={{flex:1,paddingVertical:8,marginBottom:8,}}
          // styleInner={{}}
          textStyle={{fontSize:18}}
          onPress={switchScreenHandler}
          screen={'Payment'}
        />
        
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
  }


})

