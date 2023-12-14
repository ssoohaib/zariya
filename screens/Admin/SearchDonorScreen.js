import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colorPallete from '../../constants/ColorPallete';
import { Donors } from '../../dummy_data/donor_data';
import InputBar from '../../components/InputBar';
import DonorCard from '../../components/DonorCard';
import React, { useContext, useState } from 'react';
import DonorInfoModal from '../../components/DonorInfoModal';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/AuthContext';

export default function SearchDonorScreen({ navigation }) {
  const {allUsers}=useContext(AuthContext);


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
      <>
        {
          itemData.item.userType == 'donor' &&
          <DonorCard
            id={itemData.item.id}
            firstName={itemData.item.firstName}
            lastName={itemData.item.lastName}
            email={itemData.item.email}
            contactNumber={itemData.item.contactNumber}
            imageUrl={'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
            status={'Verified'}
          />
        }
      </>
    );


  
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        {/* <View style={styles.buttonsContainer}></View> */}
        <View style={styles.inputBarcolour}>
          <InputBar
            placeHolder={'Search Username'}
            bgColor={colorPallete.mediumBlue}
            icon={'magnify'}
            iconColor={'white'}
            onChangeText={textChangeHandler}
            // style={{ borwidth: 1, }}
            inputStyle={{ backgroundColor:ColorPallete.screenBg, borderColor:ColorPallete.darkBlue, color:ColorPallete.mediumBlue }}
            placeholderTextColor={ColorPallete.darkBlue}
          />
        </View>
      </View>

      <View style={styles.donorContainer}>
        <View style={styles.donorListContainer}>
          <FlatList
            // data={allUsers.filter((donor) =>
            //   donor.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            // )}
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
    // Add your container styles here
    backgroundColor: ColorPallete.screenBg,
    paddingHorizontal:16,

  },
  heading: {
    // paddingHorizontal: 16,
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
  // Add any additional styles you need
});
