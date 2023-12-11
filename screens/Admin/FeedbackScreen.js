import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import { DonorsFeedback } from '../../dummy_data/donor_data';
import FeedbackCard from '../../components/FeedbackCard';
import React, { useState } from 'react';
import FeedbackInfoModal from '../../components/FeedbackInfoModal';

export default function SearchDonorScreen({ navigation }) {
  const switchScreenHandler = (screen) => {
    navigation.navigate(screen);
  }

    // Feedback Info State
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState();
  
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    }
  
    const callModal = () => {
      console.log('pressed');
      toggleModal();
    }
  
  const renderFlatList = (itemData) => {

    setSelectedFeedback(itemData.item)
    return (
      <FeedbackCard
        id={itemData.item.id}
        name={itemData.item.name}
        email={itemData.item.email}
        imageUrl={itemData.item.images[0]}
        desc={itemData.item.desc}
        onPress={callModal}
      />
    );
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.donorContainer}>
        <View style={styles.donorListContainer}>
        <FlatList
            data={DonorsFeedback}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatList}
          />
        </View>
      </View>

      <FeedbackInfoModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        donorfb={selectedFeedback}
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
