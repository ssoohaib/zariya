import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from "../constants/ColorPallete";

export default function SubedNgoCard(props) {
  const { id, ngoName, causes, date, duration, subscriptionStatus} = props;

  const renderCauses = () => {
    return causes.map((cause, index) => (
      <Text key={index} style={styles.plaintext}>
        {cause}{index !== causes.length - 1 ? ', ' : ''}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialIcons name="business" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>NGO Name: </Text>
        <Text style={styles.plaintext}>{ngoName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="view-list" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Causes: </Text>
        <View style={styles.causesContainer}>
          {renderCauses()}
        </View>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Date: </Text>
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
  },
  causesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
