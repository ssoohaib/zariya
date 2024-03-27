import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import NotFound from '../../components/NotFound';
import ColorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import HistoryCard from '../../components/HistoryCard';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getPendingDonations } from '../../utilities/DonorApis';
import { MaterialIcons } from '@expo/vector-icons';

export default function DonorHistoryScreen({navigation}) {

  const {currentUser, pendingDonations, token, setPendingDonationsHandler} = useContext(AuthContext);
  const [trigger, setTrigger]=useState(true)

  useEffect(()=>{
    const fetchPending= async ()=>{
      console.log('lol')

      const result = await getPendingDonations(token, currentUser._id)
      console.log(result)
      setPendingDonationsHandler(result.donations)
    }
    
    fetchPending()
  },[trigger])

  const triggerHandler=()=>{
    if (trigger)
      setTrigger(false)
    else
      setTrigger(true)
  }

  const switchScreen = (screen)=>{
    navigation.navigate(screen)
  }

  const renderHistory = itemData => {
    if (!currentUser || !itemData)
      return
    

    if (itemData.item.donationStatus!=='Pending')
    {
      let title = itemData.item.donationCategory === "Monetary"?
        "Money"
        :
        itemData.item.donationCategory

      title+=" donated to "+itemData.item.ngoName
      
      return (
        <HistoryCard
          id={itemData.item.id}
          category={itemData.item.donationCategory}
          title={title}
          status={itemData.item.donationStatus}
          date={itemData.item.donationDate}
          donation={itemData.item.donation}
        />
      )
    }
  }

  const renderPendingDonations = (itemData)=>{
    if (itemData.item.donationStatus!=="Pending")
      return

    return (
      <View style={styles.donContainer}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text style={styles.title}>{itemData.item.donationCategory}</Text>
            {
              itemData.item.donation.items.map((i, index)=>(
                <Text style={styles.subsubtitle}>{i.title}</Text>
              ))
            }
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Text style={styles.subsubtitle}>From</Text>
            <Text style={[styles.title, {fontSize:14}]}>{itemData.item.donation.from.slice(0,10)} ({itemData.item.donation.from.slice(12,16)})</Text>
            <Text style={styles.subsubtitle}>Till</Text>
            <Text style={[styles.title, {fontSize:14}]}>{itemData.item.donation.till.slice(0,10)} ({itemData.item.donation.till.slice(12,16)})</Text>
          </View>
          <View style={styles.bottomRight}>
            <Text style={styles.status}>{itemData.item.donationStatus}</Text>
          </View>
        </View>
    </View>
    )
  }

    return (
      <>
        {
          currentUser &&
          <View style={styles.container}>
            <StatusBar style='dark' />

            <View style={{marginBottom:16,}}>
              <View style={{ flexDirection:'row', justifyContent:"space-between", alignItems:"center"}}>
                <Text style={[styles.subtitle, {marginBottom:16}]}>Pending</Text>
                <Pressable onPress={triggerHandler}>
                  <MaterialIcons name="refresh" size={24} color="black" />
                </Pressable>
              </View>

              {
                pendingDonations && pendingDonations.length>0 ? 
                  <FlatList 
                    data={pendingDonations}
                    keyExtractor={i=>i._id}
                    renderItem={renderPendingDonations}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                  />
                  :
                  <Text style={{textAlign:"center"}}>No ongoing donations.</Text>
              }

            </View>

            <Text style={styles.subtitle}>History</Text>
            <FlatList
              data={currentUser.donationsMade}
              keyExtractor={i=>i.id}
              renderItem={renderHistory}
              showsVerticalScrollIndicator={false}
            />         
          </View>
        }
      </>

      
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:ColorPallete.screenBg,
    paddingHorizontal:16,
    paddingTop:48,

  },
  subtitle:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:16,

  },
    

  donContainer:{
    // borderWidth:1,
    borderColor:ColorPallete.lightTextColor,
    borderRadius:16,
    padding:16,
    marginRight:6,
    // marginBottom:12,

    // backgroundColor:'#F5F5F5',
    backgroundColor:ColorPallete.fLightColor,
},
top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:.5,
    borderColor:ColorPallete.lightTextColor,
    paddingBottom:12,
    
    

},
topLeft:{
    // flexDirection:'row',
    // justifyContent:'flex-start'
    // alignItems:'flex-start'
    
},
topLeftIcon:{
    backgroundColor:ColorPallete.mediumBlue,
    padding:8,
    justifyContent:"center",
    alignItems:'center',
    marginRight:8,
    borderRadius:8,
},
topRight:{

},
bottom:{
    paddingTop:12,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',

},
bottomLeft:{
  marginRight:16,

},
bottomRight:{
    backgroundColor:ColorPallete.mediumBlue,
    padding:8,
    // paddingHorizontal:8,
    borderRadius:8,
},
title:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:4,
    color:ColorPallete.darkBlue,

},
subsubtitle:{
    color:ColorPallete.lightTextColor,
    fontSize:14,

},
status:{
    color:ColorPallete.screenBg,
    fontWeight:'bold',
    
}
});