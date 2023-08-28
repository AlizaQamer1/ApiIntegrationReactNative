// AddPost.js

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';

import styles from './Style';
import Input from '../../components/input';
import Buttoncomponent from '../../components/button';
import Title from '../../components/Title';
import {images} from '../../assets/images';

export default function EditUserProfile({navigation}) {
  const [maidenName, setMaidenName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState();
  const [birthDate, setBirthDate] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode]=useState();
  const [state,setState]=useState();
  const maidenNameInputRef = useRef();
  const ageInputRef = useRef();
  const phoneInputRef = useRef();
  const birthDateInputRef = useRef();
  const bloodGroupInputRef = useRef();
  const heightInputRef = useRef();
  const weightInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef=useRef();
  const postalCodeInputRef=useRef();
  const stateInputRef=useRef();

  const handlePost = async () => {};

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backicon} source={images.backarrow} />
            </TouchableOpacity>
            <Title style={styles.title} title="Edit Your Information" />
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.postform}>
              {/* maidenname input */}
              <Text style={styles.text}>Maiden Name</Text>
              <Input
                value={maidenName}
                onChangeText={maidenName => setMaidenName(maidenName)}
                placeholder="e.g Lisa "
                ref={maidenNameInputRef}
                returnKeyType="next"
                onSubmitEditing={() => ageInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="text"
              />
              {/* age input */}
              <Text style={styles.text}>Age</Text>
              <Input
                value={age}
                onChangeText={age => setAge(age)}
                placeholder="e.g 22 "
                ref={ageInputRef}
                returnKeyType="next"
                onSubmitEditing={() => phoneInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="number"
              />
              {/* phone input */}
              <Text style={styles.text}>Phone Number</Text>
              <Input
                value={phone}
                onChangeText={phone => setPhone(phone)}
                placeholder="e.g +927916758914"
                ref={phoneInputRef}
                returnKeyType="next"
                onSubmitEditing={() => birthDateInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="number"
              />
              {/* birthdate input */}
              <Text style={styles.text}>BirthDate</Text>
              <Input
                value={birthDate}
                onChangeText={birthDate => setBirthDate(birthDate)}
                placeholder="e.g 2000-12-25"
                ref={birthDateInputRef}
                returnKeyType="next"
                onSubmitEditing={() => bloodGroupInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="number"
              />

              {/* bloodGroup input */}
              <Text style={styles.text}>Blood Group</Text>
              <Input
                value={bloodGroup}
                onChangeText={bloodGroup => setBloodGroup(bloodGroup)}
                placeholder="e.g A-"
                ref={bloodGroupInputRef}
                returnKeyType="next"
                onSubmitEditing={() => heightInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="text"
              />

              {/* height input */}
              <Text style={styles.text}>Height</Text>
              <Input
                value={height}
                onChangeText={height => setHeight(height)}
                placeholder="e.g 189"
                ref={heightInputRef}
                returnKeyType="next"
                onSubmitEditing={() => weightInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="number"
              />

              {/* weight input */}
              <Text style={styles.text}>Weight</Text>
              <Input
                value={weight}
                onChangeText={weight => setWeight(weight)}
                placeholder="e.g 70"
                ref={weightInputRef}
                returnKeyType="next"
                onSubmitEditing={() => addressInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="number"
              />

              {/* address input */}
              <Text style={styles.text}>Address</Text>
              <Input
                value={address}
                onChangeText={address => setAddress(address)}
                placeholder="e.g 1745 T Street Southeast"
                ref={addressInputRef}
                returnKeyType="next"
                onSubmitEditing={() => cityInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="text"
              />
              {/* city input */}
              <Text style={styles.text}>City</Text>
              <Input
                value={city}
                onChangeText={city => setCity(city)}
                placeholder="e.g Washington"
                ref={cityInputRef}
                returnKeyType="next"
                onSubmitEditing={() => postalCodeInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="text"
              />

                {/* postalcode input */}
                <Text style={styles.text}>Postal Code</Text>
              <Input
                value={postalCode}
                onChangeText={postalCode => setPostalCode(postalCode)}
                placeholder="e.g 20020"
                ref={postalCodeInputRef}
                returnKeyType="next"
                onSubmitEditing={() => stateInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="number"
              />

                {/* state input */}
                <Text style={styles.text}>State</Text>
              <Input
                value={state}
                onChangeText={state => setState(state)}
                placeholder="e.g DC"
                ref={stateInputRef}
                returnKeyType="next"
                // onSubmitEditing={() => stateInputRef?.current?.focus()}
                blurOnSubmit={false}
                inputType="text"
              />

              <Buttoncomponent buttonColor="#0492C2" title="Edit" />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
