import React from 'react';
import {Text} from 'react-native';
import styles from './Style';

export default function Title({title,navigation}) {
  
  return <Text style={styles.heading}>{title}</Text>;
}
