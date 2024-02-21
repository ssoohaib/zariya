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
            console.log(result.assets[0])
            props.setter(prev=>[...prev,result.assets[0].uri])
        }
    };

    const deleteImage = (index) => {
        console.log(index)
        // return
        let newImages = props.images.filter((item, i)=>i!==index)
        props.setter(newImages)

    }

  return (
    <View style={styles.imageContainerr}>
        <Text style={styles.title}>{props.title} <Text style={{color: props.error ? 'red':ColorPallete.lightTextColor}}>({props.minImages} Min)</Text></Text>
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
                            {
                                props.images[index] &&
                                <View style={styles.bin}>
                                    <Pressable onPress={()=>deleteImage(index)}>
                                        <MaterialIcons name="delete" size={16} color={ColorPallete.mediumBlue} />
                                    </Pressable>
                                </View>
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
    bin:{
        position:'absolute',
        top:-8,
        right:-8,
        backgroundColor:'white',
        borderRadius:4,
        padding:4,
        elevation:5,
    }
})