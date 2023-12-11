import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import { NGOS } from '../../dummy_data/dummy_data';
//import { Donors } from '../../dummy_data/donor_data';
import InputBar from '../../components/InputBar';
import RecipientCard from '../../components/RecipientCard';
import React, { useState } from 'react';
import RecipientInfoModal from '../../components/RecipientInfoModal';

export default function SearchRecipientScreen({ navigation }) {
  const switchScreenHandler = (screen) => {
    navigation.navigate(screen);
  }

  // Search User State
  const [searchTerm, setSearchTerm] = useState('');
  const textChangeHandler = (text) => {
    setSearchTerm(text);
  }

  // Donor Info State
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState();


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const callModal = () => {
    toggleModal();
  }

  const renderFlatList = (itemData) => {

    setSelectedDonor(itemData.item)
    return (
      <RecipientCard
        id={itemData.item.id}
        title={itemData.item.title}
        logo={itemData.item.logo}
        phone={itemData.item.contact.phone}
        onPress={callModal}
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
            data={NGOS.filter((ngo) =>
                ngo.title.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatList}
          />
        </View>
      </View>

      <RecipientInfoModal
        ngo={selectedDonor}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
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
