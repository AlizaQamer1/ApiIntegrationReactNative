import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

import {storage} from '../../Storage';
import {logToConsole} from '../../../ReactotronConfig';
import {images} from '../../assets/images/index';
import styles from './style';
import {registerUser} from '../../helpers/PostApi';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';

export default function Registeration({navigation}) {
  const [isFormValid, setIsFormValid] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email,setEmail]=useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setfirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError]=useState('')
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const ageInputRef = useRef();
  const emailInputRef=useRef();
  //for image
  const [image, setImage] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Camera Permission Denied',
            'You have denied camera permission. To enable the camera permission, go to the app settings.',
            [
              {text: 'Cancel'},
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
          return false; // Permission denied
        } else {
          return false; // Permission denied
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // For platforms other than Android
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        logToConsole('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        logToConsole('uri -> ', response.assets[0].uri);

        setImage(response.assets[0]);
      });
    }
  };

  const handleImageSelection = async () => {
    const options = {
      mediaType: 'photo',
      width: 200,
      height: 200,
      quality: 1,
    };

    const permissionGranted = await requestCameraPermission();
    if (permissionGranted) {
      Alert.alert(
        'Choose Image Source',
        'Pick an image from:',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Gallery',
            onPress: () => launchImageLibrary(options, handleResponse),
          },
          {
            text: 'Camera',
            onPress: () => captureImage('photo'),
          },
        ],
        {cancelable: true},
      );
    }
  };

  const handleResponse = response => {
    logToConsole('Response = ', response);

    if (response.didCancel) {
      alert('User cancelled image picker');
      return;
    } else if (response.errorCode === 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode === 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode === 'others') {
      alert(response.errorMessage);
      return;
    }

    logToConsole('uri -> ', response.assets[0].uri);

    setImage(response.assets[0]);
  };
  const validateForm = () => {
    if (
      userName.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      age.trim() !== '' &&
      password === confirmPassword &&
      email.trim () !== ''
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleRegisteration = async event => {
    setUserNameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setfirstNameError('');
    setLastNameError('');
    setAgeError('');

    validateForm();

    // Check for empty fields
    if (userName.trim() === '') {
      setUserNameError('Username is required.');
    }
    if (email.trim() === '') {
      setEmailError('Email is required.');
    }


    if (password.trim() === '') {
      setPasswordError('Password is required.');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required.');
    }
    if (firstName.trim() === '') {
      setfirstNameError('Firstname is required.');
    }
    if (lastName.trim() === '') {
      setLastNameError('Lastname is required.');
    }
    if (age.trim() === '') {
      setAgeError('Age is required.');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password should be same.');
    }

    //password pattern
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.{8,12})$/;

    //check for different conventions
    if (
      !passwordPattern.test(password) &&
      !passwordPattern.test(confirmPassword)
    ) {
      let errorMessage = '';
      if (password.length < 8 || password.length > 12) {
        errorMessage += 'Password must be 8-12 characters long ';
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errorMessage += 'Password must contain at least one lowercase letter ';
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessage += 'Password must contain at least one uppercase letter ';
      }
      if (!/(?=.*\d)/.test(password)) {
        errorMessage += 'Password must contain at least one digit ';
      }
      if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
        errorMessage += 'Password must contain at least one special character ';
      }
      //if pattern donot match show error

      setConfirmPasswordError(errorMessage);
    }
    try {
      const data = await registerUser(
        userName,
        password,
        firstName,
        lastName,
        age,
        confirmPassword,
        image,
        email
      );
      console.log("image", data.image.uri)
      storage.set('image', data.image.uri);
      if (isFormValid) {
        navigation.replace('BottomStack');
      }
    } catch (error) {
      console.log('error', error);
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

  const handleFirstNameFocus = () => {
    setfirstNameError('');
  };

  const handleLastNameFocus = () => {
    setLastNameError('');
  };

  const handleAgeFocus = () => {
    setAgeError('');
  };
  const handleEmailFocus=()=>{
    setEmailError('')
  }
 
  const handleUserNameChange = userName => {
    setUserName(userName);
    validateForm();
  };

  const handlePasswordChange = password => {
    setPassword(password);
    validateForm();
  };

  const handleConfirmPasswordChange = confirmPassword => {
    setConfirmPassword(confirmPassword);
    validateForm();
  };

  const handleFirstNameChange = firstName => {
    setFirstName(firstName);
    validateForm();
  };

  const handleLastNameChange = lastName => {
    setLastName(lastName);
    validateForm();
  };

  const handleAgeChange = age => {
    setAge(age);
    validateForm();
  };
  const handleEmailChange = email => {
    setEmail(email);
    validateForm();
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.registerationcontainer}>
          <View style={styles.registerationscreen}>
            <KeyboardAvoidingView enabled>
              <Image style={styles.logoimage} source={images.logo_image} />
              <Text style={styles.title}>Make New Account</Text>
              <View style={styles.registerationform}>
              {/* email input */}
              <Text style={styles.text}>Email</Text>
                <Input
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder={'Enter Email'}
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => userNameInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleEmailFocus}
                  inputType="text"
                />
                {/* Showing error*/}
                {!!emailError && (
                  <Text style={styles.errorText}>{emailError}</Text>
                )}
                {/* UserName input */}
                <Text style={styles.text}>Username</Text>
                <Input
                  value={userName}
                  onChangeText={handleUserNameChange}
                  placeholder={'Enter Username'}
                  ref={userNameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => firstNameInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleUserNameFocus}
                  inputType="text"
                />
                {/* Showing error*/}
                {!!userNameError && (
                  <Text style={styles.errorText}>{userNameError}</Text>
                )}
                {/* first name input */}
                <Text style={styles.text}>Firstname</Text>
                <Input
                  value={firstName}
                  onChangeText={handleFirstNameChange}
                  placeholder={'Enter Firstname'}
                  ref={firstNameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleFirstNameFocus}
                  inputType="text"
                />
                {/* Showing error*/}
                {!!firstNameError && (
                  <Text style={styles.errorText}>{firstNameError}</Text>
                )}
                {/* lastname input */}
                <Text style={styles.text}>Lastname</Text>
                <Input
                  value={lastName}
                  onChangeText={handleLastNameChange}
                  placeholder={'Enter Lastname'}
                  ref={lastNameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => ageInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleLastNameFocus}
                  inputType="text"
                />
                {/* Showing error*/}
                {!!lastNameError && (
                  <Text style={styles.errorText}>{lastNameError}</Text>
                )}
                {/* age input */}
                <Text style={styles.text}>Age</Text>
                <Input
                  value={age.toString()}
                  onChangeText={handleAgeChange}
                  placeholder={'Enter Age'}
                  ref={ageInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleAgeFocus}
                  inputType="number"
                />
                {/* Showing error*/}
                {!!ageError && <Text style={styles.errorText}>{ageError}</Text>}
                {/* Password input */}
                <Text style={styles.text}>Password</Text>
                <Input
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder={'Enter Password'}
                  ref={passwordInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    confirmPasswordInputRef?.current?.focus()
                  }
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  onFocus={handlePasswordFocus}
                />
                {/* Showing error */}
                {!!passwordError && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
                {/* Confirm Password input */}
                <Text style={styles.text}>Confirm Password</Text>
                <Input
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder={'Enter Confirm Password'}
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
                {/* Inout input */}
                <Text style={styles.text}>Add Profile Image</Text>
                <View style={styles.imagebutton}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => handleImageSelection('photo')}>
                    <Text style={styles.textstyle}>Choose Image</Text>
                  </TouchableOpacity>
                </View>
                {image && (
                  <Image source={{uri: image.uri}} style={styles.image} />
                )}
                <Buttoncomponent
                  buttonColor="#0492C2"
                  title="Register"
                  onPress={handleRegisteration}
                  disabled={!isFormValid} // Disable the button if the form is not valid
                />
                {/* Registeration Footer */}
                <View style={styles.registerationfooter}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footertext}>
                      Already have an account ?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
