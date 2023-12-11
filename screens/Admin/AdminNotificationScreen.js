import { View, Text, StyleSheet, FlatList } from "react-native";
import RecipientNotificationCard from "../../components/NotificationCard";
import { NOTIFICATIONS } from "../../dummy_data/dummy_data";
import ColorPallete from "../../constants/ColorPallete";
import { StatusBar } from "expo-status-bar";
import NotFound from '../../components/NotFound';
import React, { useState } from 'react';

export default function RecipientNotification() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const switchScreen = (screen) => {
    navigation.navigate(screen);
  }

  const switchScreenWithData = (screen, id) => {
    navigation.navigate(screen, {
      id: id
    });
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
    console.log('Marked as Read');
  };

  const handleMarkAsUnread = (id) => {
    toggleRead(id);
    console.log('Marked as Unread');
  };

  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const renderNotifications = (itemData) => {
    return (
      <RecipientNotificationCard
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
    );
  };

  return (
    <>
      {
        NOTIFICATIONS.length < 1 ?
          <NotFound
            name={'No Notifications Found'}
            desc={"You have currently no notifications. We'll notify you when something new arrives."}
            btnTitle={'Back to Home'}
            btnFunctions={switchScreen}
            screen={"Home"}
            btnTitleStyle={{ fontSize: 15, fontWeight: 'bold' }}
          />
          :
          <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.subtitle}>Notifications</Text>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={renderNotifications}
              showsVerticalScrollIndicator={false}
            />
          </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 48,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
    marginLeft: 16,
    alignContent: 'center',
    textAlign: 'center'
  }
});