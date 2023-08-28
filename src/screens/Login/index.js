import React, {useState, useRef, useEffect} from 'react';
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
import NetInfo from '@react-native-community/netinfo';
import RadioForm from 'react-native-simple-radio-button';

import {images} from '../../assets/images/index';
import styles from './style';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';
import {storage} from '../../Storage';
import {loginUser} from '../../helpers/PostApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions';

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const radioProps = [{label: 'Remember Me', value: 0}];
  const [isConnected, setIsConnected] = useState(true);
  const dispatch=useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async event => {
    
    setEmailError('');
    setPasswordError('');
    event.preventDefault();

    // Check if both fields have values
    if (!email.trim() || !password.trim()) {
      if (email.trim() === '') {
        setEmailError('Email is required.');
      }
      if (password.trim() === '') {
        setPasswordError('Password is required.');
      }
      return;
    }

    try {
      setIsLoading(true);
      const data = await loginUser(email, password);
      dispatch(loginSuccess(data))
      console.log("email and password values", email,password)

      if (data) {
        storage.set('token', data.hashAT);
        navigation.replace('BottomStack');
        setIsLoading(false);
      } else {
        setPasswordError('email and  password incorrect');
      }
    } catch (error) {
      setPasswordError('email or password incorrect');
      console.log('error', error);
    }
  };

  const handleEmailFocus = () => {
    setEmailError('');
  };

  const handlePasswordFocus = () => {
    setPasswordError('');
  };

  return (
    <SafeAreaView>
    {isConnected ?(
      <View style={styles.logincontainer}>
        <View style={styles.loginscreen}>
          <KeyboardAvoidingView enabled>
            <Image style={styles.logoimage} source={images.logo_image} />
            <Text style={styles.title}>Sign In to Continue</Text>
            <View style={styles.loginform}>
              {/*Handling email input */}
              <Text style={styles.text}>Email</Text>
              <Input
                value={email}
                onChangeText={email => setEmail(email)}
                placeholder={'Enter Email'}
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current.focus()}
                blurOnSubmit={false}
                onFocus={handleEmailFocus}
              />

              {!!emailError && (
                <Text style={styles.errorText}>{emailError}</Text>
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

              {!!passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}

              <Buttoncomponent
                title="Login"
                onPress={handleLogin}
                buttonColor={isloading ? 'lightblue' : '#0492C2'}
                isLoading={isloading} 
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
                    onPress={() => navigation.navigate('registeristscreen')}>
                    <Text style={styles.footertext}>Make New Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      )
      :(
        <Text>No Internet connection</Text>
      )}
    </SafeAreaView>
  );
}

//A333@liza@