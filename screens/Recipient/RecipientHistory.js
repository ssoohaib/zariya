import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import NotFound from '../../components/NotFound';
import ColorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import HistoryCard from '../../components/HistoryCard';
import { HISTORY } from '../../dummy_data/dummy_data';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function DonorHistoryScreen({ navigation }) {

  const { currentUser } = useContext(AuthContext);

  const switchScreen = (screen) => {
    navigation.navigate(screen)
  }

  const renderHistory = itemData => {
    if (!currentUser)
      return

    // extracting except pending
    if (itemData.item.donationStatus!=='Pending')
      return (
      <HistoryCard
        id={itemData.item.id}
        category={itemData.item.donationCategory}
        title={itemData.item.donationCategory+' donated to '+itemData.item.ngoName}
        status={itemData.item.donationStatus}
        date={itemData.item.donationDate}
        donation={itemData.item.donation}
      />
    )}

    return (
      <>
        {
          currentUser &&
          <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.subtitle}>History</Text>
            <FlatList
              data={currentUser.donationsMade}
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
  container: {
    flex: 1,
    backgroundColor: ColorPallete.screenBg,
    paddingHorizontal: 16,
    paddingTop: 48,

  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,

  },

});