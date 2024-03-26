import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function SubedUsersCard(props) {
  const { id, donorName, causes, date, amount, duration, subscriptionStatus} = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="account" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Subscribed User: </Text>
        <Text style={styles.plaintext}>{donorName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="view-list" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Causes: </Text>
        <Text style={styles.plaintext}>{causes} </Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Subscription Date: </Text>
        <Text style={styles.plaintext}>{date}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="account-clock" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Duration: </Text>
        <Text style={styles.plaintext}>{duration}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="sticker-check-outline" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Status: </Text>
        <Text style={styles.plaintext}>{subscriptionStatus}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 9,
    padding: 16,
    marginBottom: 12,
    backgroundColor: ColorPallete.fLightColor,
    width: "97%",
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  plaintext: {
    fontSize: 16,
  }
});
