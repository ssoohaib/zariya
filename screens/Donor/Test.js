import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MyIp from '../../ip';

const Test = () => {
  const [imageURI, setImageURI] = useState(null);

  const [images, setImages]=useState([])

  const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        if (!result.canceled) {
            setImageURI(result.assets[0].uri);
            setImages(prev=>[...prev,result.assets[0]])
        }
    };

  const uploadImage = () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: 'image' + index + '.jpg',
      });
    });

    const lol={
        one: 'one',
        two: 'two',
        three: 'three',
    }
    formData.append('text', JSON.stringify(lol));

    fetch(`http://${MyIP}:5000/test`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error uploading image:', error));
  };
  

  return (
    <View style={{borderWidth:1, marginTop:64}}>
      <Button title="Select Image" onPress={pickImage} />
      <Button title='upload' onPress={uploadImage}/>
      {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default Test;