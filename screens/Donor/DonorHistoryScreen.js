import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import NotFound from '../../components/NotFound';
import ColorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import HistoryCard from '../../components/HistoryCard';
import { HISTORY } from '../../dummy_data/dummy_data';

export default function DonorHistoryScreen({navigation}) {

  const switchScreen = (screen)=>{
    navigation.navigate(screen)
  }

  const renderHistory = itemData => (
      <HistoryCard
        title={itemData.item.title}
        puid={itemData.item.puid}
        date={itemData.item.date}
        donationType={itemData.item.donationType}
        status={itemData.item.status}
      />
    )

    return (
      <>
        {
          HISTORY.length < 1 ?
          <NotFound
            title={'No History Found'}
            desc={"Make some donations to see your history. All your donations will arrive here."}
            btnTitle={'Back to Home'}
            btnFunctions={switchScreen}
            screen={"Home"}
            btnTitleStyle={{fontSize:15,fontWeight:'bold'}}
          />
          :
          <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.subtitle}>History</Text>
            <FlatList
              data={HISTORY}
              keyExtractor={i=>i.id}
              renderItem={renderHistory}
              showsVerticalScrollIndicator={false}
            />         
          </View>
        }
      </>

      
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:ColorPallete.screenBg,
    paddingHorizontal:16,
    paddingTop:48,

  },
  subtitle:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:16,

  },
    
});