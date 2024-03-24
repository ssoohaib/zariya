import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import ColorPallete from '../../constants/ColorPallete';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import date from 'date-and-time';
import { set } from 'date-fns';

export default function AnalyticsAndReports() {
  const {currentUser} = useContext(AuthContext);
  const [totalDonationsState, setTotalDonationsState] = useState([])
  const [totalMonDonationState, setTotalMonetaryDonationsData] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [selectedMonetaryFilter, setSelectedMonetaryFilter] = useState("All-m")

  const totalDonations = currentUser.donationsMade.filter(donation=>donation.donationStatus === 'Complete').length;
  const totalMonetaryDonations = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Monetary' && donation.donationStatus === 'Complete').length;
  const totalFoodDonations = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Food' && donation.donationStatus === 'Complete').length;
  const totalRationDonations = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Ration' && donation.donationStatus === 'Complete').length;
  const totalClothesDonations = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Clothes' && donation.donationStatus === 'Complete').length;
  const totalMedicineDonations = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Medicine' && donation.donationStatus === 'Complete').length;

  const totalDonationsData = [
    {value: totalMonetaryDonations, label: 'Money', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalDonationsData[0].value}</Text>)},
    {value: totalFoodDonations, label: 'Food', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalDonationsData[1].value}</Text>)},
    {value: totalRationDonations, label: 'Ration', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalDonationsData[2].value}</Text>)},
    {value: totalClothesDonations, label: 'Clothes', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalDonationsData[3].value}</Text>)},
    {value: totalMedicineDonations, label: 'Meds', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalDonationsData[4].value}</Text>)},
  ]

  const totalMoney = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Monetary' && donation.donationStatus === 'Complete');
  const totalOneTimeMoney = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Monetary' && donation.donationStatus === 'Complete' && donation.donation.type === 'One Time');
  const totalSubscriptionMoney = currentUser.donationsMade.filter(donation=>donation.donationCategory === 'Monetary' && donation.donationStatus === 'Complete' && donation.donation.type === 'Subscription');

  console.log(totalMoney, totalOneTimeMoney, totalSubscriptionMoney)

  let sumAll=0;
  totalMoney.forEach(element => {
    sumAll+=element.donation.amount;
  });
  let sumOne=0;
  totalOneTimeMoney.forEach(element => {
    sumOne+=element.donation.amount;
  });
  let sumSub=0;
  totalSubscriptionMoney.forEach(element => {
    sumSub+=element.donation.amount;
  });

  console.log(sumAll, sumOne, sumSub)

  const totalMonetaryDonationsData = [
    {value: sumAll, label: 'All', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalMonetaryDonationsData[0].value}</Text>)},
    {value: sumOne, label: 'One-Time', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalMonetaryDonationsData[1].value}</Text>)},
    {value: sumSub, label: 'Subscription', frontColor: ColorPallete.mediumBlue, topLabelComponent: () => ( <Text style={{color: ColorPallete.mediumBlue, fontSize: 14, marginBottom: 2}}>{totalMonetaryDonationsData[2].value}</Text>)},
  ]

  useEffect(()=>{
    setTotalDonationsState(totalDonationsData)
    setTotalMonetaryDonationsData(totalMonetaryDonationsData)
  }, [])


  const selectedFilterHandler = (name)=>{
    setSelectedFilter(name)
    if (name==='All-m' || name==='One-Time' || name==='Subscription'){
      setSelectedMonetaryFilter(name)
    }
    if (name==='All'){
      totalDonationsData[0].value = totalMonetaryDonations;
      totalDonationsData[1].value = totalFoodDonations;
      totalDonationsData[2].value = totalRationDonations;
      totalDonationsData[3].value = totalClothesDonations;
      totalDonationsData[4].value = totalMedicineDonations;
    } else if (name==='Money'){
      totalDonationsData[0].value = totalMonetaryDonations;
      totalDonationsData[1].value = 0;
      totalDonationsData[2].value = 0;
      totalDonationsData[3].value = 0;
      totalDonationsData[4].value = 0;
    } else if (name==='Food'){
      totalDonationsData[0].value = 0;
      totalDonationsData[1].value = totalFoodDonations;
      totalDonationsData[2].value = 0;
      totalDonationsData[3].value = 0;
      totalDonationsData[4].value = 0;
    } else if (name==='Ration'){
      totalDonationsData[0].value = 0;
      totalDonationsData[1].value = 0;
      totalDonationsData[2].value = totalRationDonations;
      totalDonationsData[3].value = 0;
      totalDonationsData[4].value = 0;
    } else if (name==='Clothes'){
      totalDonationsData[0].value = 0;
      totalDonationsData[1].value = 0;
      totalDonationsData[2].value = 0;
      totalDonationsData[3].value = totalClothesDonations;
      totalDonationsData[4].value = 0;
    } else if (name==='Medicine'){
      totalDonationsData[0].value = 0;
      totalDonationsData[1].value = 0;
      totalDonationsData[2].value = 0;
      totalDonationsData[3].value = 0;
      totalDonationsData[4].value = totalMedicineDonations;
    } else if (name==='All-m'){
      totalMonetaryDonationsData[0].value = sumAll;
      totalMonetaryDonationsData[1].value = sumOne;
      totalMonetaryDonationsData[2].value = sumSub;
    } else if (name==='One-Time'){
      totalMonetaryDonationsData[0].value = 0;
      totalMonetaryDonationsData[1].value = sumOne;
      totalMonetaryDonationsData[2].value = 0;
    } else if (name==='Subscription'){
      totalMonetaryDonationsData[0].value = 0;
      totalMonetaryDonationsData[1].value = 0;
      totalMonetaryDonationsData[2].value = sumSub;
    }
    setTotalDonationsState(totalDonationsData)
    setTotalMonetaryDonationsData(totalMonetaryDonationsData)
  }
    return (
      <ScrollView style={styles.container}>
        <View style={{overflow:"hidden",}}>
          <Text style={styles.title}>Donations ({totalDonations})</Text>
          <View style={{flexDirection:"row", marginBottom:16, alignItems:"center"}}>
            <Pressable onPress={()=>selectedFilterHandler('All')}>
              <Text style={[styles.filterOptions, selectedFilter === 'All' && styles.selectedFilter]}>All</Text>
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('Money')}>
              <Text style={[styles.filterOptions, selectedFilter === 'Money' && styles.selectedFilter]}>Money</Text>
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('Food')}>
              <Text style={[styles.filterOptions, selectedFilter === 'Food' && styles.selectedFilter]}>Food</Text>  
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('Ration')}>
              <Text style={[styles.filterOptions, selectedFilter === 'Ration' && styles.selectedFilter]}>Ration</Text>
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('Clothes')}>
              <Text style={[styles.filterOptions, selectedFilter === 'Clothes' && styles.selectedFilter]}>Clothes</Text>
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('Medicine')}>
              <Text style={[styles.filterOptions, selectedFilter === 'Medicine' && styles.selectedFilter]}>Medicine</Text>
            </Pressable>
          </View>
          <View>
            <BarChart
              barWidth={50}
              noOfSections={3}
              barBorderRadius={4}
              frontColor="lightgray"
              data={totalDonationsState}
              yAxisThickness={0}
              xAxisThickness={0}
              spacing={10}
              isAnimated 
            />  
          </View>
        </View>
        <View style={{overflow:"hidden",}}>
          <Text style={styles.title}>Spendings Rs. ({sumAll})</Text>
          <View style={{flexDirection:"row", marginBottom:16, alignItems:"center"}}>
            <Pressable onPress={()=>selectedFilterHandler('All-m')}>
              <Text style={[styles.filterOptions, selectedMonetaryFilter === 'All-m' && styles.selectedFilter]}>All</Text>
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('One-Time')}>
              <Text style={[styles.filterOptions, selectedMonetaryFilter === 'One-Time' && styles.selectedFilter]}>One-Time</Text>
            </Pressable>
            <Pressable onPress={()=>selectedFilterHandler('Subscription')}>
              <Text style={[styles.filterOptions, selectedMonetaryFilter === 'Subscription' && styles.selectedFilter]}>Subscription</Text>
            </Pressable>
          </View>
          <View>
            <BarChart
              barWidth={85}
              noOfSections={3}
              barBorderRadius={4}
              frontColor="lightgray"
              data={totalMonDonationState}
              yAxisThickness={0}
              xAxisThickness={0}
              spacing={10}
              isAnimated 
            />  
          </View>
        </View>

        <View style={{alignItems:'center'}}>
          <Pressable style={{marginTop:20, paddingVertical:12, paddingHorizontal:16, borderRadius:10, backgroundColor:ColorPallete.mediumBlue, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:ColorPallete.screenBg, fontSize:14, marginRight:8, fontWeight:'bold'}}>Download Report</Text>
            <MaterialCommunityIcons name="download" size={24} color={ColorPallete.screenBg} />
          </Pressable>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      paddingHorizontal:16,
      backgroundColor: ColorPallete.screenBg,
    },
    title:{
      fontSize:16,
      fontWeight:'bold',
      color:ColorPallete.mediumBlue,
      marginVertical:16,
    },
    filterOptions:{
      borderWidth:1,
      color:ColorPallete.mediumBlue,
      padding:4,
      borderRadius:8,
      marginRight:6,
      overflow:"hidden",
      borderColor:ColorPallete.mediumBlue,
    },
    selectedFilter:{
      backgroundColor:ColorPallete.mediumBlue,
      color:ColorPallete.screenBg,

    }
});