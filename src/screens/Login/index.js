import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import RadioForm from 'react-native-simple-radio-button';

import {images} from '../../assets/images/index';
import styles from './style';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const radioProps = [{label: 'Remember Me', value: 0}];

  const handleLogin = () => {
    setUserNameError('');
    setPasswordError('');

    //handle error if username and password input is null
    if (userName.trim() === '') {
      setUserNameError('Username is required.');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required.');
    }
  };

  const handleUserNameFocus = () => {
    setUserNameError('');
  };

  const handlePasswordFocus = () => {
    setPasswordError('');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <View style={styles.logincontainer}>
          <View style={styles.loginscreen}>
            <Image style={styles.logoimage} source={images.logo_image} />
            <Text style={styles.title}>Sign In to Continue</Text>
            <View style={styles.loginform}>
              {/*Handling username input */}
              <Text style={styles.text}>Username</Text>
              <Input
                value={userName}
                onChangeText={userName => setUserName(userName)}
                placeholder={'Enter Username'}
                ref={userNameInputRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef?.current?.focus()}
                blurOnSubmit={false}
                onFocus={handleUserNameFocus}
              />

              {/*Showing error */}
              {!!userNameError && (
                <Text style={styles.errorText}>{userNameError}</Text>
              )}

              {/*Handling passwoed input */}
              <Text style={styles.text}>Password</Text>
              <Input
                value={password}
                onChangeText={password => setPassword(password)}
                placeholder={'Enter Password'}
                ref={passwordInputRef}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                onFocus={handlePasswordFocus}
              />
              {/*Showing error */}
              {!!passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}

              {/* <View style={styles.loginbutton}>
              <Button title="Login" color="#0492C2" onPress={handleLogin} />
            </View> */}
              <Buttoncomponent title="Login" onPress={handleLogin} />

              {/*Login Footer */}
              <View style={styles.loginfooter}>
                <View style={styles.leftfooter}>
                  {/*Remember Me*/}
                  <RadioForm
                    radio_props={radioProps}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={'#2196f3'}
                    buttonSize={15}
                    animation={true}
                    onPress={value => {
                      console.log('Selected value:', value);
                    }}
                  />
                </View>

                {/*Forgot Password and Registeration screens links */}
                <View style={styles.rightfooter}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footertext}>Make New Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
