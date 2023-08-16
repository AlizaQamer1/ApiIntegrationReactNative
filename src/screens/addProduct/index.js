import React from 'react'
import { Text ,View} from 'react-native'
import Title from '../../components/Title'
import styles from './Style'

export default function AddProduct() {
  return (
   <View style={styles.container}>
   <Title title="Add New Product"/>
   </View>
  )
}
