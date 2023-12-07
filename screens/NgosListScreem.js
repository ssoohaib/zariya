import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import NgoCard from '../components/NgoCard';
import { NGOS } from '../dummy_data/dummy_data';
import ColorPallete from '../constants/ColorPallete';


export default function NgosListScreen({navigation}) {

  const ngoScreenHandler = (id)=>{
    navigation.navigate('NgoDetails',{
      id:id
    })
  }

  const renderFlatList = (itemData) =>{
    return(
      <NgoCard 
        id={itemData.item.id}
        title={itemData.item.title}
        onPress={ngoScreenHandler}
        desc={itemData.item.desc}
        imageUrl={itemData.item.images[0]}
      />
    )
  }

    return (
      <ScrollView style={styles.container}>
        {/* <Text style={styles.subtitle}>All</Text> */}
        <View>
          <FlatList
            data={NGOS}
            keyExtractor={(item)=>item.id}
            renderItem={renderFlatList}
          />
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:16,
    paddingTop:16,
    backgroundColor:ColorPallete.screenBg,

  },
  subtitle:{
    fontSize:16,
    fontWeight:'bold',
    marginVertical:8,
  }
    
});