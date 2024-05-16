import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorPallete from '../constants/ColorPallete';

const HorizontalBarGraph = ({ data, labels, maxValue }) => {

  if (isNaN(maxValue) || maxValue <= 0) {
    return null; // Return null or handle the case appropriately
  }
  const barWidthUnit = 150 / maxValue; 

  return (
    <View style={styles.container}>
      {data.map((value, index) => (
        <View key={index} style={styles.barContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.barLabel}>{labels[index]}</Text>
          </View>
          <View style={[styles.bar, { width: value * barWidthUnit }]}>
            <Text style={styles.barValue}>{value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 5,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelContainer: {
    width: 170, 
  },
  bar: {
    backgroundColor: ColorPallete.darkBlue, 
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5, 
  },
  barLabel: {
    fontSize: 17,
    color: 'black',
    marginRight: 5,
  },
  barValue: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default HorizontalBarGraph;
