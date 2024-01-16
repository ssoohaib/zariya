import { FlatList, StyleSheet, Text, View } from 'react-native';
import NotFound from '../../components/NotFound';
import { NOTIFICATIONS } from '../../dummy_data/dummy_data';
import ColorPallete from '../../constants/ColorPallete';
import NotificationCard from '../../components/NotificationCard';
import { StatusBar } from 'expo-status-bar';
import RecipientNotificationCard from '../../components/RecipientNotificationCard';
import { useState } from 'react';


export default function DonorNotifactionScreen({navigation}) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const switchScreen = (screen)=>{
    navigation.navigate(screen)
  }

  const switchScreenWithData = (screen, id)=>{
    navigation.navigate(screen,{
      id:id
    })
  }

  const toggleRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => {
        if (notification.id === id) {
          notification.status = notification.status === 'read' ? 'unread' : 'read';
          notification.read = notification.status === 'read';
        }
        return notification;
      })
    );
  };

  const handleMarkAsRead = (id) => {
    toggleRead(id);
  };

  const handleMarkAsUnread = (id) => {
    toggleRead(id);
  };

  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // const toggleRead=(id)=>{
  //   let not=NOTIFICATIONS.find(i=>i.id==id)

  //   if (not.status=="read")
  //     NOTIFICATIONS.find(i=>i.id==id).status="unread"
  //   else
  //     NOTIFICATIONS.find(i=>i.id==id).status="read"
  // }

  const renderNotifications = (itemData)=>{
    return(
      <RecipientNotificationCard
        from={'donor'}
        id={itemData.item.id}
        recieverId={itemData.item.recieverId}
        name={itemData.item.name}
        desc={itemData.item.desc}
        time={itemData.item.time}
        icon={itemData.item.icon}
        status={itemData.item.status}
        isRead={itemData.item.read}
        onMarkAsRead={() => handleMarkAsRead(itemData.item.id)}
        onMarkAsUnread={() => handleMarkAsUnread(itemData.item.id)}
        onDelete={() => handleDelete(itemData.item.id)}
      />
      // <NotificationCard 
      //   id={itemData.item.id}
      //   recieverId={itemData.item.recieverId}
      //   title={itemData.item.title}
      //   desc={itemData.item.desc}
      //   time={itemData.item.time}
      //   icon={itemData.item.icon}
      //   status={itemData.item.status}
      //   onPress={switchScreenWithData}
      //   toggleRead={toggleRead}
      // />
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