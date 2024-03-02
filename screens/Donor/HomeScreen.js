import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconButton from '../../components/IconButton';
import NgoCard from '../../components/NgoCard';
import colorPallete from '../../constants/ColorPallete'
import ImageButton from '../../components/ImageButton';
import InputBar from '../../components/InputBar';
import { NGOS } from '../../dummy_data/dummy_data';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function HomeScreen({navigation}) {
  const {currentUser} = useContext(AuthContext);

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }

  const switchToDonation = (screen)=>{
    navigation.navigate('DonationEnter',{
      donationCategory:screen
    })
  }

  const ngoScreenHandler = (id)=>{
    navigation.navigate('NgoDetails',{
      id:id
    })
  }

  const renderFlatList = (itemData) =>{
    return(
      <NgoCard 
        id={itemData.item.id}
        title={itemData.item.title}
        onPress={ngoScreenHandler}
        desc={itemData.item.desc}
        imageUrl={itemData.item.images[0]}
        descLength={68}

      />
    )
  }

  const renderFavNgoFlatList = (itemData) =>{
    const ngo = NGOS.find(ngo=>ngo.id===itemData.item)
    return (
      <NgoCard 
        id={ngo.id}
        title={ngo.title}
        onPress={ngoScreenHandler}
        desc={ngo.desc}
        imageUrl={ngo.images[0]}
        containerStyle={{height:240, width:240, marginRight:8, marginBottom:-16}}
        imageStyle={{height:150}}
        descLength={30}
      />     
    )
    
  }

    return (
      <ScrollView style={styles.container}> 
        <View style={styles.headerContainer}>
          <View style={styles.headerUpper}>
            <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
            <View style={styles.userContainer}>
              {/* <View style={styles.userTextContainer}>
                <Text style={styles.userGreet}>Hi,</Text>
                <Text style={styles.userName}>{currentUser.firstName}</Text>
              </View> */}
              <ImageButton
                style={styles.userImage}
                onPress={switchScreenHandler}
                screen={'Donor Profile'}
              />
            </View>
          </View>
          {/* <View style={styles.lowerHeader}>
            <InputBar 
              placeHolder={'Search NGOs, Causes'}
              bgColor={colorPallete.mediumBlue}
              icon={'magnify'}
              iconColor={'white'}

            />
          </View> */}
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Donate</Text>
          <View style={styles.buttonsContainer}>
            <IconButton 
              title={'Food'} 
              icon={'food-fork-drink'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:4}}
              onPress={switchToDonation}
              screen={'Food'}
            />
            <IconButton 
              title={'Clothes'} 
              icon={'tshirt-crew'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginHorizontal:4}}  
              onPress={switchToDonation}
              screen={'Clothes'}
            />
            <IconButton 
              title={'Medicine'} 
              icon={'medical-bag'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginHorizontal:4}}  
              onPress={switchToDonation}
              screen={'Medicine'}
            />
            <IconButton 
              title={'Ration'} 
              icon={'food-variant'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginLeft:4}}
              onPress={switchToDonation}
              screen={'Ration'}
            />
          </View>
        </View>
        {
          currentUser.favouriteNgos.length >= 1 && 
          <>
            <View style={[styles.ngoSearchContainer, {paddingHorizontal:16}]}>
              <Text style={styles.subtitle}>Favourite</Text>
            </View>
            <View style={styles.favContainer}>
              <FlatList
                data={currentUser.favouriteNgos}
                keyExtractor={(item)=>item.id}
                renderItem={renderFavNgoFlatList}
                horizontal={true}
              />
            </View>
          </>
        }
        <View style={styles.ngoContainer}>
          <View style={styles.ngoSearchContainer}>
            <Text style={styles.subtitle}>Browse</Text>
            <IconButton 
              // icon={'magnify'} 
              title={'See All'}
              // bgColor={colorPallete.screenBgTwo} 
              iconColor={colorPallete.lightTextColor} 
              style={{flex:0}}
              onPress={switchScreenHandler}
              screen={'NgosList'}
            />
          </View>
          <View style={styles.ngoListContainer}>
            <FlatList
              data={NGOS}
              keyExtractor={(item)=>item.id}
              renderItem={renderFlatList}
            />
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
    },
    headerContainer:{
      paddingTop:48,
      paddingBottom:32,
      paddingHorizontal:16,
      backgroundColor:colorPallete.mediumBlue,
      // borderBottomStartRadius:16,
      // borderBottomEndRadius:16,

      // borderWidth:1,
      // borderColor:'red',
    },
    headerUpper:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',

      // borderWidth:1,
      // borderColor:'red',
    },
    logo:{
      width:70,
      height:'100%',

      // borderWidth:1,
      // borderColor:'red',

    },
    userContainer:{
      flexDirection:"row",

      // borderWidth:1,
      // borderColor:'red',

    },
    userTextContainer:{
      marginRight:8,
      justifyContent:'center',

      // borderWidth:1,
      // borderColor:'red',
    },
    userGreet:{
      color:colorPallete.screenBg,
      textAlign:'right',
      // width:'100%',

      // borderWidth:1,
      // borderColor:'red',

    },
    userName:{
      fontSize:16,
      fontWeight:'bold',
      color:colorPallete.screenBg,

      // borderWidth:1,
      // borderColor:'red',

    },
    userImage:{
      height:40,
      width:40,
      borderRadius:20,
      borderWidth:4,
      borderColor:colorPallete.lightBlue,

    },
    lowerHeader:{
      marginTop:16,

      // borderWidth:1,
      // borderColor:'red',

    },
    categoryContainer:{
      paddingHorizontal:16,


    },
    favContainer:{
      paddingHorizontal:16,
      flexDirection:'row',


      // borderWidth:1
    },
    subtitle:{
      fontSize:18,
      fontWeight:'bold',
      // marginTop:8,
      // marginBottom:16,
      marginVertical:16,
    },
    buttonsContainer:{
      flexDirection:'row',

    },
    ngoContainer:{
      paddingHorizontal:16,
      
    },
    ngoSearchContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      // marginVertical:8,

    },
    ngoListContainer:{

    }
});