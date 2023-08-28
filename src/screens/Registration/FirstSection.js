import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../../components/input';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './style';
import {images} from '../../assets/images';
import Buttoncomponent from '../../components/button';
const FirstSection = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [userRoleError, setUserRoleError] = useState('');
  const userNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const genderInputRef = useRef();
  const userRoleInputRef = useRef();

  const userroledata = [
    {label: 'NormalAdmin', value: 'NormalAdmin'},
    {label: 'SuperAdmin', value: 'SuperAdmin'},
    {label: 'NormalUser', value: 'NormalUser'},
  ];
  const genderdata = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];
  const handleUserNameFocus = () => {
    setUserNameError('');
  };
  const handleEmailFocus = () => {
    setEmailError('');
  };
  const handleGenderFocus = () => {
    setGenderError('');
  };

  const handlePhoneFocus = () => {
    setPhoneError('');
  };

  const handleUserRoleFocus = () => {
    setUserRoleError('');
  };

  const handleUserNameChange = userName => {
    setUserName(userName);
  };

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePhoneChange = phone => {
    setPhone(phone);
  };

  const handleOnNext = async event => {
    // Check for empty fields
    if (userName.trim() === '') {
      setUserNameError('Username is required.');
    }
    if (email.trim() === '') {
      setEmailError('Email is required.');
    }

    if (phone.trim() === '') {
      setPhoneError('Phone Number is required.');
    }
    if (userRole.trim() === '') {
      setUserRoleError('User Role is required.');
    }
    if (gender.trim() === '') {
      setGenderError('Gender is required.');
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setEmailError('Email must be a valid email address.');
      return;
    }

    // Check for valid phone number format
    const phoneNumberPattern = /^\+92\d{10}$/;
    if (!phoneNumberPattern.test(phone)) {
      setPhoneError(
        'Phone number must start with "+92" followed by 10 digits.',
      );
      return;
    }

    try {
      if ((userName, email, phone, userRole, gender)) {
        navigation.navigate('Register', {
          userName,
          gender,
          phone,
          userRole,
          email,
        });
      } else {
        console.log('Invalid fields');
      }
    } catch (error) {
      console.log('error', error);
    }
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
                <Text style={styles.text}>Username</Text>
                <Input
                  value={userName}
                  onChangeText={handleUserNameChange}
                  placeholder={'Enter Username'}
                  ref={userNameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleUserNameFocus}
                  inputType="text"
                />
                {/* Showing error*/}
                {!!userNameError && (
                  <Text style={styles.errorText}>{userNameError}</Text>
                )}
                {/* Add other input fields */}
                <Text style={styles.text}>Email</Text>
                <Input
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder={'Enter Email'}
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => phoneInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handleEmailFocus}
                  inputType="text"
                />
                {/* Showing error*/}
                {!!emailError && (
                  <Text style={styles.errorText}>{emailError}</Text>
                )}
                {/* Phone input */}
                <Text style={styles.text}>Phone</Text>
                <Input
                  value={phone}
                  onChangeText={handlePhoneChange}
                  placeholder={'e.g +923121234567'}
                  ref={phoneInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => userRoleInputRef?.current?.focus()}
                  blurOnSubmit={false}
                  onFocus={handlePhoneFocus}
                />
                {/* Showing error*/}
                {!!phoneError && (
                  <Text style={styles.errorText}>{phoneError}</Text>
                )}
                {/* User Role dropdown */}
                <Text style={styles.text}>User Role</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={userroledata}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select UserRole'}
                  searchPlaceholder="Search..."
                  value={userRole}
                  onFocus={handleUserRoleFocus}
                  onChange={item => {
                    setUserRole(item.value);
                  }}
                />
                {/* Showing error*/}
                {!!userRoleError && (
                  <Text style={styles.errorText}>{userRoleError}</Text>
                )}

                {/* Gender dropdown */}
                <Text style={styles.text}>Gender</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={genderdata}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select Gender'}
                  searchPlaceholder="Search..."
                  value={gender}
                  onFocus={handleGenderFocus}
                  onChange={item => {
                    setGender(item.value);
                  }}
                />
                {/* Showing error*/}
                {!!genderError && (
                  <Text style={styles.errorText}>{genderError}</Text>
                )}
                <Buttoncomponent
                  buttonColor="#0492C2"
                  title="Next"
                  onPress={handleOnNext}
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
};

export default FirstSection;
