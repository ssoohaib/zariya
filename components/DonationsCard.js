import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function DonationsCard(props) {
  const { id, firstName, lastName } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="account-heart" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Donation ID: {id}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="business" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>FIRST NAME: {firstName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="account-heart-outline" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>LAST NAME: {lastName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: ColorPallete.lightTextColor,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: ColorPallete.fLightColor,
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
    fontSize: 16,
  },
});
