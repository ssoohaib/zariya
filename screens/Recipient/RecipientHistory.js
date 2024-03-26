import { FlatList, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import NotFound from '../../components/NotFound';
import ColorPallete from '../../constants/ColorPallete';
import { StatusBar } from 'expo-status-bar';
import RecHistoryCard from '../../components/RecHistoryCard'
import { Ionicons } from '@expo/vector-icons';;
import { HISTORY } from '../../dummy_data/dummy_data';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function RecipientHistory({ navigation }) {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  const switchScreen = (screen) => {
    navigation.navigate(screen)
  }

  const renderHistory = itemData => {
    if (!currentUser)
      return


    if (itemData.item.donationStatus === 'Complete') {
      let title = itemData.item.donationCategory === "Monetary" ?
        "Money"
        :
        itemData.item.donationCategory

      title += " received from " + itemData.item.donorName

      return (
        <RecHistoryCard
          id={itemData.item.id}
          category={itemData.item.donationCategory}
          title={title}
          status={itemData.item.donationStatus}
          date={itemData.item.donationDate}
          donation={itemData.item.donation}
        />
      )
    }
  }

  return (
    <>
      {
        currentUser &&
        <View style={styles.container}>
          <StatusBar style='dark' />
          <View style={styles.backButton}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} color="#453953" />
            </Pressable>
            <Text style={styles.subtitle}>History</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={currentUser.donationsReceived}
              keyExtractor={i => i.id}
              renderItem={renderHistory}
              showsVerticalScrollIndicator={false}
            />
          </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,

  },
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 70,
    zIndex: 1,
  },
  listContainer: {
    marginTop: 70,
  },

});