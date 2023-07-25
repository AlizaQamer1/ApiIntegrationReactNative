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
import RadioForm from 'react-native-simple-radio-button';
import {images} from '../../assets/images/index';

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
    <SafeAreaView>
      <View style={styles.logincontainer}>
        <View style={styles.loginscreen}>
          <Image style={styles.logoimage} source={images.logo_image} />
          <Text style={styles.title}>Sign In to Continue</Text>
          <View style={styles.loginform}>
          {/*Handling username input */}
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
            <TextInput
              value={password}
              onChangeText={password => setPassword(password)}
              placeholder={'Enter Password'}
              style={styles.input}
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry
              onFocus={handlePasswordFocus}
            />
               {/*Showing error */}
            {!!passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            <View style={styles.loginbutton}>
              <Button title="Login" color="#0492C2" onPress={handleLogin} />
            </View>
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
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.footertext}>Forgot Password?</Text>
                </TouchableOpacity>
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
  );
}
