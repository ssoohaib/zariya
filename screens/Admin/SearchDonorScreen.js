import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import { Donors } from '../../dummy_data/donor_data';
import InputBar from '../../components/InputBar';
import DonorCard from '../../components/DonorCard';
import React, { useState } from 'react';
import DonorInfoModal from '../../components/DonorInfoModal';

export default function SearchDonorScreen({ navigation }) {
  const switchScreenHandler = (screen) => {
    navigation.navigate(screen);
  }

  // Search User State
  const [searchTerm, setSearchTerm] = useState('');
  const textChangeHandler = (text) => {
    setSearchTerm(text);
  }

  const [selectedDonor, setSelectedDonor] = useState();


  const renderFlatList = (itemData) => {

    setSelectedDonor(itemData.item)
    return (
      <DonorCard
        id={itemData.item.id}
        name={itemData.item.name}
        email={itemData.item.email}
        phone={itemData.item.contact.phone}
        imageUrl={itemData.item.images[0]}
        status={itemData.item.status}
      />
    );


  
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.buttonsContainer}></View>
        <View style={styles.inputBarcolour}>
          <InputBar
            placeHolder={'Search Username'}
            bgColor={colorPallete.mediumBlue}
            icon={'magnify'}
            iconColor={'white'}
            onChangeText={textChangeHandler}
          />
        </View>
      </View>

      <View style={styles.donorContainer}>
        <View style={styles.donorListContainer}>
          <FlatList
            data={Donors.filter((donor) =>
              donor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatList}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // Add your container styles here
  },
  heading: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 3,
  },
  inputBarcolour: {
    backgroundColor: '#afafaf',
    borderRadius: 20,
  },
  // Add any additional styles you need
});
