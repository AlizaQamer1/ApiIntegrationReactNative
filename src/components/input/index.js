// Input.js

import React from 'react';
import { TextInput } from 'react-native';
import styles from './Style';

export default function Input({
  value,
  onChangeText,
  placeholder,
  ref,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  onFocus,
  secureTextEntry,
  inputType, // New prop for indicating input type
}) {
  const keyboardType = inputType === 'number' ? 'numeric' : 'default';

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
      autoCapitalize="none"
      ref={ref}
      returnKeyType={returnKeyType}
      maxLength={inputType === 'number' ? 10 : 30} // Adjust max length if needed
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={blurOnSubmit}
      onFocus={onFocus}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
}
