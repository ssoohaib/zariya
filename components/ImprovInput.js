// ImprovInput.js

import React from "react";
import { TextInput, View, Text, StyleSheet, Platform } from "react-native";
import ColorPallete from "../constants/ColorPallete";

export default function ImprovInput(props) {
  const { tag, value, onChange, inputMode, inputStyle, secureTextEntry, multiline, errorMessage } = props;

  return (
    <View style={styles.container}>
      {tag && (
        <View style={styles.tagContainer}>
          <Text style={[styles.tag, props.tagStyle]}>{tag}</Text>
        </View>
      )}
      <View style={[styles.inputContainer, { borderColor: errorMessage ? 'red' : ColorPallete.lightTextColor }]}>
        <TextInput
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          value={value}
          onChangeText={onChange}
          numberOfLines={props.rows}
          style={[styles.input, inputStyle, errorMessage && styles.inputError]}
          inputMode={inputMode}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
        />
      </View>
      {errorMessage && (
        <Text style={{ color: 'red', marginLeft: 8 }}>{errorMessage}</Text>
      )}
      {props.liveLength && (
        <Text style={[styles.correctionText, props.correctionTextStyle]}>
          {value.length}/{props.maxLength} characters
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -16,
  },
  tagContainer: {
    alignItems: 'flex-start',
    zIndex: 99,
  },
  tag: {
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 2,
    paddingRight: 3,
    position: 'relative',
    top: 16,
    left: 8,
    backgroundColor: ColorPallete.screenBg,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: ColorPallete.lightTextColor,
    marginBottom: 8,
  },
  input: {
    padding: Platform.OS == 'android' ? 10 : 16,
    paddingLeft: 10,
    borderRadius: 16,
    borderColor: ColorPallete.lightTextColor,
  },
  inputError: {
    borderColor: 'red',
  },
  correctionText: {
    marginTop: 4,
    textAlign: 'right',
    color: ColorPallete.lightTextColor,
    fontWeight: 'bold',
  },
});
