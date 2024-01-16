
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ColorPallete from '../constants/ColorPallete';
import IconButton from './IconButton';
import { NGOS } from '../dummy_data/dummy_data';

export default function RecipientInfoModal(props) {

  const { isModalVisible, toggleModal, ngo } = props;

  const selectedRecipient = NGOS.find((i)=>i.id==props.id)

  const handleRemovePress = () => {
    console.log('remove pressed');
    // Display a confirmation dialog
    Alert.alert(
      'Confirm',
      'Do you want to remove this user?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log('User removed!');
            toggleModal();
          },
        },
      ],
      { cancelable: false }
    );
    
  };

  const handleContactPress = () => {
    console.log('remove pressed');
    // Open the default email app with a pre-filled email
    Linking.openURL(`mailto:${ngo.email}`);
  };

  return (
    <Modal
      // onSwipeCancel={toggleModal}
      isVisible={isModalVisible}
      style={styles.modalContainer}
      onBackdropPress={toggleModal}
    >
      {(
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: props.userData.logo }}
            resizeMode="cover"
          />
          <View style={styles.overlayContainer}>
            <Text style={styles.nameContainer}>{props.userData.title.toUpperCase()}</Text>
            <Text style={styles.textContainer}>{props.userData.description.slice(0,250)}</Text>
            <View style={styles.btmContainer}>
              <View style={{flexDirection:"row", marginVertical:16, justifyContent:"space-between"}}>
                <Text style={styles.contactContainer}>0300 14566432</Text>
                <Text style={styles.contactContainer}>{props.userData.city}, Pakistan</Text>
              </View>
              <View style={styles.causesContainer}>
                <Text style={{color:colorPallete.mediumBlue, fontWeight:'bold', marginBottom:8}}>Causes</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  {
                    props.userData.causes.map((i, count)=>(
                      count<3 &&
                      <View style={{padding:8, borderRadius:8, backgroundColor:colorPallete.mediumBlue,marginRight:4}}>
                        <Text style={{color:colorPallete.screenBg}}>{i}</Text>
                      </View>                   
                    ))
                  }
                </View>
                <View style={{flexDirection:'row'}}>
                  {
                    props.userData.causes.map((i, count)=>(
                      count>=3 && count<6 &&
                      <View style={{padding:8, borderRadius:8, backgroundColor:colorPallete.mediumBlue,marginRight:4}}>
                        <Text style={{color:colorPallete.screenBg}}>{i}</Text>
                      </View>                   
                    ))
                  }
                </View>
                <View style={{flexDirection:'row'}}>
                  {
                    props.userData.causes.map((i, count)=>(
                      count>=6 &&
                      <View style={{padding:8, borderRadius:8, backgroundColor:colorPallete.mediumBlue,marginRight:4}}>
                        <Text style={{color:colorPallete.screenBg}}>{i}</Text>
                      </View>                   
                    ))
                  }
                </View>
              </View>
                
            </View>
          </View>
          <View style={[styles.bottomContainer, {margin:0, marginTop:16,}]}>  
            <IconButton
              title={'Documents'}
              icon={'file-document'}
              bgColor={colorPallete.mediumBlue}
              iconColor={colorPallete.screenBg}
              // style={{ marginLeft: 5, top: 10, padding: 5 }}
              onPress={handleContactPress}
            />
          </View>
          <View style={styles.bottomContainer}>
                
              <IconButton
                  title={'Accept'}
                  icon={'check'}
                  bgColor={colorPallete.mediumBlue}
                  iconColor={colorPallete.screenBg}
                  style={{ marginRight: 8 }}
                  onPress={handleRemovePress}
                />
                
                <IconButton
                  title={'Reject'}
                  icon={'cancel'}
                  bgColor={colorPallete.mediumBlue}
                  iconColor={colorPallete.screenBg}
                  // style={{ marginRight: 4}}
                  onPress={handleContactPress}
                />
          </View>

          {/* <View style={{height:100,}}></View> */}
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    //backgroundColor:colorPallete.mediumBlue,
    backgroundColor:'white',
    borderRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    top: '12%',
    margin: 0,
  },
  container: {
    flex: 1,
    //backgroundColor:colorPallete.mediumBlue,
    alignItems: 'center',

    // borderWidth:1
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    // position: 'absolute',
    // top:-10,
  },
  overlayContainer:{
      marginTop:16,
      textAlign: 'center',

      // borderWidth:1
  },
  textContainer: {
    // fontSize: 15,
    // fontWeight:'400',
    color:'white',
    lineHeight:18,
    color:'black',
    marginTop:16,

    // borderColor:'black',
    // borderWidth:1

  },
  nameContainer: {
    fontSize: 20,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    color:'black'
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
},
causesContainer:{
  borderRadius:16,
  overflow:'hidden',
  backgroundColor:colorPallete.lightBlue,
  padding:16,
},
contactContainer:{
  // marginTop:17,
  // fontSize: 20,
  // color:'white',
  fontWeight:'bold',
  // fontStyle:'normal',
  color:colorPallete.lightTextColor,
  // lineHeight:25
},
btmContainer:{
  // flexDirection:'row'
}
});
