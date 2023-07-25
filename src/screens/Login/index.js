import React, {useState, useRef} from 'react';
import styles from './style';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {images} from '../../assets/images/index'

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <SafeAreaView>
   
  
      <View style={styles.logincontainer}>
        <View style={styles.loginscreen}>
          <Image
            style={styles.logoimage}
            source={images.logo_image}></Image>
          <View style={styles.loginform}>
            <Text style={styles.text}>Username</Text>
            <TextInput
              value={userName}
              onChangeText={userName => setUserName(userName)}
              placeholder={'Enter Username'}
              style={styles.input}
              autoCapitalize="none"
              ref={userNameInputRef}
              returnKeyType="next"
              maxLength={30}
              onSubmitEditing={() =>
                 passwordInputRef?.current?.focus()
              }
              blurOnSubmit={false}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              value={password}
              onChangeText={password => setPassword(password)}
              placeholder={'Enter Password'}
              style={styles.input} 
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry
             
            />
            <View style={styles.loginbutton}>
              <Button title="Login" color="#0492C2" />
            </View>
            <View style={styles.loginfooter}>
              <TouchableOpacity>
                <Text style={styles.footertext}>Forgot password ?</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.footertext}>Already have an account ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  
    </SafeAreaView>
  );
}
