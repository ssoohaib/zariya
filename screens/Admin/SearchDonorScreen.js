import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import InputBar from '../../components/InputBar';
import DonorCard from '../../components/AdminDonorCard';
import React, { useContext, useState } from 'react';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/AuthContext';

export default function SearchDonorScreen({ navigation }) {
  const { allUsers } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const textChangeHandler = (text) => {
    setSearchTerm(text);
  }

  const cardNavigationHandler =(id)=>{
    // console.log('-----',id)
    navigation.navigate("AdminDonorScreen",{
      id:id
    })
  }

  const renderFlatList = (itemData) => {
    return (
      <>
        {itemData.item.userType === 'donor' && (
          <DonorCard
            id={itemData.item._id}
            firstName={itemData.item.firstName}
            lastName={itemData.item.lastName}
            email={itemData.item.email}
            imageUrl={itemData.item.photo}
            recipientApproval={itemData.item.recipientApproval}
            onPress={cardNavigationHandler}
          />
        )}
      </>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.inputBarcolour}>
          <InputBar
            placeHolder={'Search Username'}
            bgColor={colorPallete.mediumBlue}
            icon={'magnify'}
            iconColor={'white'}
            onChangeText={textChangeHandler}
            inputStyle={{ backgroundColor: ColorPallete.screenBg, borderColor: ColorPallete.darkBlue, color: ColorPallete.mediumBlue }}
            placeholderTextColor={ColorPallete.darkBlue}
          />
        </View>
      </View>

      <View style={styles.donorContainer}>
        <View style={styles.donorListContainer}>
          <FlatList
            data={
              allUsers.filter((donor) =>
                donor.userType == 'donor' &&
                donor.firstName.toLowerCase().includes(searchTerm.toLowerCase())
              )
            }
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
    backgroundColor: ColorPallete.screenBg,
    paddingHorizontal: 16,
  },
  heading: {
    paddingVertical: 16,
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
});
