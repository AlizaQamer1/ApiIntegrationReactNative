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
  ScrollView
} from 'react-native';
import {images} from '../../assets/images/index';

export default function Registeration({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const handleRegisteration = () => {
    setUserNameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Check for empty fields
    if (userName.trim() === '') {
      setUserNameError('Username is required.');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required.');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required.');
    }

    if (password!==confirmPassword) {
        setConfirmPasswordError('Password and Confirm Password should be same.');
      }

      //password pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.{8,12})$/;
  
    //check for different conventions
    if (!passwordPattern.test(password) && !passwordPattern.test(confirmPassword)) {
      let errorMessage = "";
      if (password.length < 8 || password.length > 12) {
        errorMessage += "Password must be 8-12 characters long ";
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errorMessage += "Password must contain at least one lowercase letter ";
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessage += "Password must contain at least one uppercase letter ";
      }
      if (!/(?=.*\d)/.test(password)) {
        errorMessage += "Password must contain at least one digit ";
      }
      if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
        errorMessage += "Password must contain at least one special character ";
      }
      //if pattern donot match show error
  
      setConfirmPasswordError(errorMessage)
    
    }
  };

  const handleUserNameFocus = () => {
    setUserNameError('');
  };

  const handlePasswordFocus = () => {
    setPasswordError('');
  };

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordError('');
  };
  return (
    <ScrollView>
    <SafeAreaView>
      <View style={styles.registerationcontainer}>
        <View style={styles.registerationscreen}>
          <Image style={styles.logoimage} source={images.logo_image} />
          <Text style={styles.title}>Make New Account</Text>
          <View style={styles.registerationform}>
          {/* UserName input */}
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
               {/* Showing error*/}
            {!!userNameError && (
              <Text style={styles.errorText}>{userNameError}</Text>
            )}
               {/* Password input */}
            <Text style={styles.text}>Password</Text>
            <TextInput
              value={password}
              onChangeText={password => setPassword(password)}
              placeholder={'Enter Password'}
              style={styles.input}
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="done"
              onSubmitEditing={()=>confirmPasswordInputRef?.current?.focus()}
              blurOnSubmit={false}
              secureTextEntry
              onFocus={handlePasswordFocus}
            />
               {/* Showing error */}
            {!!passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
               {/* Confirm Password input */}
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
              placeholder={'Enter Confirm Password'}
              style={styles.input}
              autoCapitalize="sentences"
              ref={confirmPasswordInputRef}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry
              onFocus={handleConfirmPasswordFocus}
            />
               {/* Showing error */}
            {!!confirmPasswordError && (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            )}
            <View style={styles.registerationbutton}>
              <Button title="Register" color="#0492C2" onPress={handleRegisteration} />
            </View>
               {/* Registeration Footer */}
            <View style={styles.registerationfooter}>
             
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footertext}>Already have an account ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
