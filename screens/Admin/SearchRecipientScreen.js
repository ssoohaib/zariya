import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import InputBar from '../../components/InputBar';
import RecipientCard from '../../components/RecipientCard';
import React, { useContext, useState } from 'react';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/AuthContext';

export default function SearchRecipientScreen({ navigation }) {
  const { allUsers } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const textChangeHandler = (text) => {
    setSearchTerm(text);
  }

  const cardNavigationHandler =(id)=>{
    console.log('-----',id)
    navigation.navigate("AdminRecipientProfileScreen",{
      id:id
    })
  }

  const renderFlatList = (itemData) => {
    return (
      <>
        {itemData.item.userType === 'recipient' && (
          <RecipientCard
            id={itemData.item._id}
            title={itemData.item.title}
            email={itemData.item.email}
            contactNumber={itemData.item.contactNumber}
            causesImages={itemData.item.causesImages[0]}
            recipientApproval={itemData.item.recipientApproval}
            donationsReceived={itemData.item.donationsReceived}
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

      <View style={styles.recipientContainer}>
        <View style={styles.recipientListContainer}>
          <FlatList
            data={
              allUsers.filter((recipient) =>
                recipient.userType == 'recipient' &&
                recipient.title.toLowerCase().includes(searchTerm.toLowerCase())
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
