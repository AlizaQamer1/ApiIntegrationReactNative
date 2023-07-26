import React from 'react'
import { TextInput} from 'react-native'
import styles from './Style'

export default function Input({value,onChangeText,placeholder,ref,returnKeyType,onSubmitEditing,blurOnSubmit,onFocus,secureTextEntry}) {
  return (
    <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    style={styles.input}
    autoCapitalize="none"
    ref={ref}
    returnKeyType={returnKeyType}
    maxLength={30}
    onSubmitEditing={onSubmitEditing}
    blurOnSubmit={blurOnSubmit}
    onFocus={onFocus}
    secureTextEntry={secureTextEntry}
  />
  )
}
