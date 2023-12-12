import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Donors } from '../../dummy_data/donor_data';
import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import SupportCard from '../../components/SupportCard';

export default function SearchRecipientScreen({ navigation }) {
  const switchScreenHandler = (screen) => {
    navigation.navigate(screen);
  }

  const supportScreenHandler = (id)=>{
    navigation.navigate('SupportTextScreen',{
      id:id
    })
  }

  const [selectedRecipient, setselectedRecipient] = useState();

  const renderFlatList = (itemData) => {

    setselectedRecipient(itemData.item)
    
    return (
      <SupportCard
        id={itemData.item.id}
        name={itemData.item.name}
        time={itemData.item.time}
        imageUrl={itemData.item.images[0]}
        onPress={supportScreenHandler}
      />
    );
  }
  return (
    <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <StatusBar style='dark' />
            <Text style={styles.subtitle}>Support</Text>
          </View>
          
        <View style={styles.donorListContainer}>
          <FlatList
            data={Donors}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatList}
          />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#eeeff3'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
    marginLeft: 16,
    alignContent: 'center',
    textAlign: 'center'
  },
  // Add any additional styles you need
});
