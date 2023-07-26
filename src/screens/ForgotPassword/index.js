import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {images} from '../../assets/images/index';
import styles from '../Login/style';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';

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
            <Input
              value={userName}
              onChangeText={userName => setUserName(userName)}
              placeholder={'Enter Username'}
              returnKeyType="next"
              blurOnSubmit={false}
            
            />
              <Buttoncomponent
                title="Send"
                onPress={handleForgotPassword}
              />
         
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
