import React from 'react'
import { View,Text ,Image} from 'react-native'

import styles from './Style'
import { images } from '../../../assets/images'


export default function Comments({username,title}) {
  return (
    <View style={styles.container}>
    <View style={styles.commentcontainer}>
    <Image style={styles.image} source={images.furniture}/>
    <Text style={styles.username}>{username}</Text>
    </View>
    <Text style={styles.title}>{title}</Text>
    </View>
  )
}
