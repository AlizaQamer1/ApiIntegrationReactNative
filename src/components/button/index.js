import React from 'react';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';

import styles from './Style';

export default function Buttoncomponent({ title, onPress, buttonColor, isLoading }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={isLoading ? null : onPress} // Disable onPress when isLoading is true
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator style={{marginLeft:-20}} color="black" size="small" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
