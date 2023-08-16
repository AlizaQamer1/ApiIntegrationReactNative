import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  Linking
} from 'react-native';
import {PermissionsAndroid} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Geolocation from 'react-native-geolocation-service';
import styles from './Style';
import Geolocation from '@react-native-community/geolocation';
import Title from '../../components/Title';
import Input from '../../components/input';
import {logToConsole} from '../../../ReactotronConfig';


export default function AddProductCategory({navigation}) {
  const [categoryName, setCategoryName] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

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
          return true; // Permission granted
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Camera Permission Denied',
            'You have denied camera permission and selected "Don\'t ask again". To enable the camera permission, go to the app settings.',
            [
              { text: 'Cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ]
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

  const handleCategoryNameChange = text => {
    setCategoryName(text);
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

        setFilePath(response.assets[0]);
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

    setFilePath(response.assets[0]);
  };
  const handleSave = () => {
    navigation.navigate('productCategory');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title title="Add New Category" />
        <Text style={styles.text}>Add Category Name </Text>
        <Input
          value={categoryName}
          onChangeText={handleCategoryNameChange}
          placeholder={'Enter Category Name'}
        />
        <Text style={styles.text}>Add Image </Text>
        <View style={styles.imagebutton}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => captureImage('photo')}>
            <Text style={styles.textstyle}>Launch Camera for Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imagebutton}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleImageSelection('photo')}>
            <Text style={styles.textstyle}>Choose Image</Text>
          </TouchableOpacity>
        </View>

     

        {filePath && (
          <Image source={{uri: filePath.uri}} style={styles.image} />
        )}
        <View style={styles.savebutton}>
          <TouchableOpacity activeOpacity={0.5} onPress={getOneTimeLocation}>
            <Text style={styles.textstyle}>Get Location</Text>
          </TouchableOpacity>
          <Text> Location Status: {locationStatus}</Text>
          <Text> Longitude: {currentLongitude}</Text>
          <Text> Latitude: {currentLatitude}</Text>
        </View>
        <View style={styles.savebutton}>
          <Button title="Save Category" onPress={handleSave} color="teal" />
        </View>
      </View>
    </ScrollView>
  );
}
