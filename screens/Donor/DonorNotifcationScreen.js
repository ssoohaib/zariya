import { FlatList, StyleSheet, Text, View } from 'react-native';
import NotFound from '../../components/NotFound';
import { NOTIFICATIONS } from '../../dummy_data/dummy_data';
import ColorPallete from '../../constants/ColorPallete';
import NotificationCard from '../../components/NotificationCard';
import { StatusBar } from 'expo-status-bar';


export default function DonorNotifactionScreen({navigation}) {


  const switchScreen = (screen)=>{
    navigation.navigate(screen)
  }

  const switchScreenWithData = (screen, id)=>{
    navigation.navigate(screen,{
      id:id
    })
  }

  const renderNotifications = (itemData)=>{
    return(
      <NotificationCard 
        id={itemData.item.id}
        recieverId={itemData.item.recieverId}
        title={itemData.item.title}
        desc={itemData.item.desc}
        time={itemData.item.time}
        icon={itemData.item.icon}
        onPress={switchScreenWithData}
      />
    )
  }

    return (
      <>
        {
          NOTIFICATIONS.length < 1 ?
          <NotFound
            title={'No Notifications Found'}
            desc={"You have currently no notifications. We'll notify you when something new arrives."}
            btnTitle={'Back to Home'}
            btnFunctions={switchScreen}
            screen={"Home"}
            btnTitleStyle={{fontSize:15,fontWeight:'bold'}}
          />
          :
          <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.subtitle}>Notifications</Text>
            <FlatList
              data={NOTIFICATIONS}
              keyExtractor={(i)=>i.id}
              renderItem={renderNotifications}
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

  }
    
});