import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconButton from '../../components/IconButton';
import NgoCard from '../../components/NgoCard';
import colorPallete from '../../constants/ColorPallete'
import ImageButton from '../../components/ImageButton';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import ColorPallete from '../../constants/ColorPallete';
import PushNotificationCard from '../../components/PushNotificationCard';

export default function HomeScreen({navigation}) {
  const {currentUser, allRecipients} = useContext(AuthContext);

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

  const renderFavNgoFlatList = (itemData) =>{
    if (!allRecipients)
      return

    const ngo = allRecipients.find(ngo=>ngo._id===itemData.item)
    return (
      <NgoCard 
        id={ngo._id}
        title={ngo.title}
        onPress={ngoScreenHandler}
        desc={ngo.description}
        imageUrl={ngo.causesImages[0]}
        containerStyle={{height:240, width:240, marginRight:8, marginBottom:-16}}
        imageStyle={{height:150}}
        descLength={30}
        isFav={true}
      />     
    )
  }

  const renderFlatList = (itemData) =>{
    const isFav = currentUser.favouriteNgos.find(id=>id===itemData.item._id) ? true : false

    return(
      <NgoCard 
        id={itemData.item._id}
        title={itemData.item.title}
        onPress={ngoScreenHandler}
        desc={itemData.item.description}
        imageUrl={itemData.item.causesImages[0]}
        descLength={68}
        isFav={isFav}
      />
    )
  }

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}> 
        <View style={styles.headerContainer}>
          <View style={styles.headerUpper}>
            <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
            <View style={styles.userContainer}>
              <ImageButton
                style={styles.userImage}
                onPress={switchScreenHandler}
                screen={'Donor Profile'}
              />
            </View>
          </View> 
        </View>

        {/* <PushNotificationCard
          title={'New Notification'}
          body={'You have a new notification'}
        /> */}

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
                showsHorizontalScrollIndicator={false}
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
              data={allRecipients}
              keyExtractor={(item)=>item._id}
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
      paddingBottom:24,
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