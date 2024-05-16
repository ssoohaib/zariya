import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function DonationsRecievedCard(props) {
  const { id, donorName, category, status, date } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialIcons name="business" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Donor: </Text>
        <Text style={styles.plaintext}>{donorName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="format-list-group" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Category: </Text>
        <Text style={styles.plaintext}>{category}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Date: </Text>
        <Text style={styles.plaintext}>{date}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="sticker-check-outline" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Status: </Text>
        <Text style={styles.plaintext}>{status}</Text>
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
