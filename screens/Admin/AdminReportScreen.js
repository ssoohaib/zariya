import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function AdminReportScreen() {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: 'Donor', value: 'donor' },
            { label: 'Recipient', value: 'recipient' },
            { label: 'Both', value: 'both' },
          ]}
          placeholder={{ label: 'Select an option...', value: null }}
          value={selectedValue}
          style={{
            inputIOS: {
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: 'darkslategray',
              borderRadius: 4,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
            },
            inputAndroid: {
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: 'darkslategray',
              borderRadius: 4,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    marginTop: 20,
    width: 200,
  },
});
