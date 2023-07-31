import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import RadioForm from 'react-native-simple-radio-button';

import {images} from '../../assets/images/index';
import styles from './style';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';
import {storage} from '../../Storage';
import {loginUser} from '../../helpers/PostApi';

export default function Login({navigation}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const radioProps = [{label: 'Remember Me', value: 0}];

  const handleLogin = async event => {
    setUserNameError('');
    setPasswordError('');
    event.preventDefault();

    // Check if both fields have values
    if (!username.trim() || !password.trim()) {
      if (username.trim() === '') {
        setUserNameError('Username is required.');
      }
      if (password.trim() === '') {
        setPasswordError('Password is required.');
      }
      return;
    }

    try {
      setIsLoading(true);
      const data = await loginUser(username, password);

      if (data.token) {
        storage.set('token', JSON.stringify(data.token));
        storage.set('id', JSON.stringify(data.id));

        navigation.replace('HomeStack');
      } else {
        setPasswordError('Username or password incorrect');
      }
    } catch (error) {
      setPasswordError('Username or password incorrect');
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
          <KeyboardAvoidingView enabled>
            <Image style={styles.logoimage} source={images.logo_image} />
            <Text style={styles.title}>Sign In to Continue</Text>
            <View style={styles.loginform}>
              {/*Handling username input */}
              <Text style={styles.text}>Username</Text>
              <Input
                value={username}
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

              <Buttoncomponent
                title="Login"
                onPress={handleLogin}
                buttonColor={isloading ? 'lightblue' : '#0492C2'}
                isLoading={isloading} // Pass the isLoading prop
              />

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
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}
