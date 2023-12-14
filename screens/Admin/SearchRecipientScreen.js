import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import { NGOS } from '../../dummy_data/dummy_data';
import InputBar from '../../components/InputBar';
import AdminRecipientCard from '../../components/AdminRecipientCard';
import React, { useContext, useState } from 'react';
import RecipientInfoModal from '../../components/RecipientInfoModal';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/AuthContext';

export default function SearchRecipientScreen({ navigation }) {
  const { allUsers } = useContext(AuthContext);
  const switchScreenHandler = (screen) => {
    navigation.navigate(screen);
  }

  // Search User State
  const [searchTerm, setSearchTerm] = useState('');
  const textChangeHandler = (text) => {
    setSearchTerm(text);
  }

  const [selectedRecipient, setselectedRecipient] = useState();

  const renderFlatList = (itemData) => {

    setselectedRecipient(itemData.item)
    
    return (
      <>
        {
          itemData.item.userType == 'recipient' &&
          <AdminRecipientCard
            id={itemData.item.id}
            title={itemData.item.title}
            logo={'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
            description={itemData.item.description}
            recipientApproval={itemData.item.recipientApproval ? 'Verified':'Not Verified'}
          />
        }
      </>
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
            inputStyle={{ backgroundColor:ColorPallete.screenBg, borderColor:ColorPallete.darkBlue, color:ColorPallete.mediumBlue }}
            placeholderTextColor={ColorPallete.darkBlue}
          />
        </View>
      </View>

      <View style={styles.donorContainer}>
        <View style={styles.donorListContainer}>
          <FlatList
            // data={NGOS.filter((ngo) =>
            //     ngo.title.toLowerCase().includes(searchTerm.toLowerCase())
            // )}
            data={
              allUsers.filter((ngo)=>
                ngo.userType == 'recipient' && ngo.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
    backgroundColor:ColorPallete.screenBg,
    paddingHorizontal: 16,
    // container styles here
  },
  heading: {
    // paddingHorizontal: 16,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 3,
  },
  inputBarcolour: {
    marginBottom:16
    // backgroundColor: '#afafaf',
    // borderRadius: 20,
  },
  // Add any additional styles you need
});
