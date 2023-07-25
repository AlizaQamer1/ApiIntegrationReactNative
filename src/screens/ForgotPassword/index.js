import React, {useState, useRef} from 'react';
import styles from '../Login/style';
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
import {images} from '../../assets/images/index';

export default function ForgotPassword({navigation}) {
  const [userName, setUserName] = useState('');

  //handle submit button
  const handleForgotPassword = () => {
    console.log('submitted');
  };

  return (
    <SafeAreaView>
      <View style={styles.logincontainer}>
        <View style={styles.loginscreen}>
        {/*Logo image */}
          <Image style={styles.logoimage} source={images.logo_image} />
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.loginform}>
          {/*Input for username */}
            <Text style={styles.text}>Username</Text>
            <TextInput
              value={userName}
              onChangeText={userName => setUserName(userName)}
              placeholder={'Enter Username'}
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              maxLength={30}
              blurOnSubmit={false}
            
            />

            <View style={styles.loginbutton}>
              <Button
                title="Send"
                color="#0492C2"
                onPress={handleForgotPassword}
              />
            </View>
            {/*Footer to go back to login page */}
            <View style={styles.forgotpasswordfooter}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Text style={styles.footertext}>Back To Login</Text>
              </TouchableOpacity>
           
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
