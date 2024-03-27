import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import { NGOS } from '../../dummy_data/dummy_data';
import InputBar from '../../components/InputBar';
import React, { useContext, useState } from 'react';
import RecipientRequestCard from '../../components/RecipientRequestCard';
import { AuthContext } from '../../context/AuthContext';

export default function SearchRecipientScreen({ navigation }) {
  const {allUsers} = useContext(AuthContext);

  const switchScreenHandler = (screen) => {
    navigation.navigate(screen);
  }

  // Search User State
  const [searchTerm, setSearchTerm] = useState('');
  const textChangeHandler = (text) => {
    setSearchTerm(text);
  }

  const [selectedRecipient, setselectedRecipient] = useState();


  const cardNavigationHandler =(id)=>{
    console.log('-----',id)
    navigation.navigate("AdminRecipientRequestDetails",{
      id:id
    })
  }
  const renderFlatList = (itemData) => {

    setselectedRecipient(itemData.item)
    
    return (
      <RecipientRequestCard
        id={itemData.item.id}
        title={itemData.item.title}
        // logo={'https://t4.ftcdn.net/jpg/05/26/35/07/360_F_526350772_taMM7EVaoDzWAashADdBrYkjH24hqS3c.jpg'}
        causesImages={itemData.item.causesImages[0]}
        email={itemData.item.email}
        description={itemData.item.description}
        contactNumber={itemData.item.contactNumber}
        city={itemData.item.city}
        causes={itemData.item.causes}
        onPress={cardNavigationHandler}
      />
    );


  
  }

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.heading}>
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
      </View> */}

      <View style={styles.donorContainer}>
        <View style={styles.donorListContainer}>
          <FlatList

            data={allUsers.filter((user) =>
              user.userType == 'recipient' && user.activationStatus == false
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
    // container styles here
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
