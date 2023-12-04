import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import NgoCard from '../components/NgoCard';
import colorPallete from '../constants/ColorPallete'
import ImageButton from '../components/ImageButton';
import InputBar from '../components/InputBar';
import { NGOS } from '../dummy_data/dummy_data';

export default function HomeScreen({navigation}) {

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
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
      />
    )
  }

    return (
      <ScrollView style={styles.container}> 
        <View style={styles.headerContainer}>
          <View style={styles.headerUpper}>
            <Image style={styles.logo} source={require('../assets/images/logo-white.png')} />
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.userGreet}>Hi,</Text>
                <Text style={styles.userName}>Ligma</Text>
              </View>
              <ImageButton
                style={styles.userImage}
                onPress={switchScreenHandler}
                screen={'Donor Profile'}
              />
            </View>
          </View>
          <View style={styles.lowerHeader}>
            <InputBar 
              placeHolder={'Search NGOs, Causes'}
              bgColor={colorPallete.mediumBlue}
              icon={'magnify'}
              iconColor={'white'}

            />
          </View>
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
              onPress={switchScreenHandler}
              screen={'Food'}
            />
            <IconButton 
              title={'Clothes'} 
              icon={'tshirt-crew'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginHorizontal:4}}  
              onPress={switchScreenHandler}
              screen={'Clothes'}
            />
            <IconButton 
              title={'Medicine'} 
              icon={'medical-bag'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginHorizontal:4}}  
              onPress={switchScreenHandler}
              screen={'Medicine'}
            />
            <IconButton 
              title={'Ration'} 
              icon={'food-variant'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginLeft:4}}
              onPress={switchScreenHandler}
              screen={'Ration'}
            />
          </View>
        </View>
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
      // paddingTop:48,
      // paddingHorizontal:16,
      backgroundColor:'white'
      
      // borderWidth:1,
      // borderColor:'red',
    },
    headerContainer:{
      // paddingVertical:48,
      paddingTop:48,
      paddingBottom:32,
      paddingHorizontal:16,

      // flexDirection:'row',
      // justifyContent:'space-between',
      // alignItems:'center',
      backgroundColor:colorPallete.mediumBlue,
      borderBottomStartRadius:16,
      borderBottomEndRadius:16,

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