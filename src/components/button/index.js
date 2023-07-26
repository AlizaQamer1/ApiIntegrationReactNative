import React from 'react'
import { View, Button } from 'react-native'

import styles from './Style'

export default function Buttoncomponent({title,onPress}) {
  return (
    <View style={styles.button}>
    <Button
      title={title}
      color="#0492C2"
      onPress={onPress}
    />
  </View>
  )
}
