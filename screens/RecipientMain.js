import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import ColorPallete from '../constants/ColorPallete';
import RecipientCard from '../components/RecipientCard';
import { Donors } from '../dummy_data/recipient_data';
import ImageButton from '../components/ImageButton';

function RecipientMain() {

  const switchScreenHandler = (screen) => {
    navigation.navigate(screen)
}

  const renderFlatList = (itemData) =>{
    return(
      <RecipientCard 
        id={itemData.item.id}
        name={itemData.item.name}
        //onPress={ngoScreenHandler}
        desc={itemData.item.desc}
        time={itemData.item.time}
        category={itemData.item.category}
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
                screen={'Profile'}
              />
            </View>
          </View>
        </View>
        <View style={styles.ngoContainer}>
          <View style={styles.ngoListContainer}>
            <FlatList
              data={Donors}
              keyExtractor={(item)=>item.id}
              renderItem={renderFlatList}
            />
          </View>
        </View>
      </ScrollView>
    );
}

export default RecipientMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#DEE1E0',
  },
  headerContainer:{
    paddingTop:48,
    paddingBottom:32,
    paddingHorizontal:16,
    backgroundColor:colorPallete.mediumBlue,
    borderBottomStartRadius:16,
    borderBottomEndRadius:16,
  },
  headerUpper:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
  },
  logo:{
    width:70,
    height:'100%',
  },
  userContainer:{
    flexDirection:"row",
  },
  userTextContainer:{
    marginRight:8,
    justifyContent:'center',
  },
  userGreet:{
    color:colorPallete.screenBg,
    textAlign:'right',
  },
  userName:{
    fontSize:16,
    fontWeight:'bold',
    color:colorPallete.screenBg,
  },
  userImage:{
    height:40,
    width:40,
    borderRadius:20,
    borderWidth:4,
    borderColor:colorPallete.lightBlue,

  },
  subtitle:{
    //fontSize:18,
    fontWeight:'bold',
    //marginVertical:16,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonsContainer:{
    flexDirection:'row',

  },
  ngoContainer:{
    //paddingHorizontal:16,
    
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