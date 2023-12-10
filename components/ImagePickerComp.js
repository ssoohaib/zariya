import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ColorPallete from '../constants/ColorPallete';

export default function ImagePickerComp(props) {
    const arrayOfEmptyObjs = new Array(props.imageLimit).fill({})

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            props.setter(prev=>[...prev,result.assets[0].uri])
        }
    };

  return (
    <View style={styles.imageContainerr}>
        <Text style={styles.title}>{props.title} <Text style={{color:ColorPallete.lightTextColor}}>(1 Min)</Text></Text>
        <View style={styles.imagesContainer}>
            {
                arrayOfEmptyObjs.map((item,index)=>{
                    return(
                        <Pressable onPress={pickImage} style={styles.singleImageContainer} key={index}>
                            {
                                props.images[index] ? 
                                <Image style={styles.singleImage} source={{uri:props.images[index]}} />
                                :
                                <MaterialIcons name="add-circle-outline" size={32} color={ColorPallete.mediumBlue} />
                            }
                        </Pressable>
                    )
                })
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title:{
        marginBottom:8,
        fontWeight:'bold',

    },
    imageContainerr:{
        zIndex:-9,
        marginBottom:16,

    },
    imagesContainer:{
        flexDirection:'row',
    },
    singleImageContainer:{
        height:82,
        width:82,
        borderWidth:1,
        borderStyle:'dashed',
        marginRight:8,

        alignItems:'center',
        justifyContent:"center"
    },
    singleImage:{
        height:80,
        width:80,
        
    },
})