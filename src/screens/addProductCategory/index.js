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
  Linking,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './Style';
import Geolocation from '@react-native-community/geolocation';
import Title from '../../components/Title';
import Input from '../../components/input';
import {logToConsole} from '../../../ReactotronConfig';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function AddProductCategory({navigation}) {
  const [categoryName, setCategoryName] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [connected, setConnected] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState([]);

  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    // start bluetooth manager
    BleManager.start({showAlert: false}).then(() => {
      console.log('BLE Manager initialized');
    });
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped');
        handleGetConnectedDevices();
      },
    );
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
    return () => {
      stopListener.remove();
    };
  }, []);
  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const handleGetConnectedDevices = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected bluetooth devices');
      } else {
        for (let i = 0; i < results.length; i++) {
          let peripheral = results[i];
          peripheral.connected = true;
          peripherals.set(peripheral.id, peripheral);
          setConnected(true);
          setBluetoothDevices(Array.from(peripherals.values()));
        }
      }
    });
  };
  const connectToPeripheral = peripheral => {
    if (peripheral.connected) {
      BleManager.disconnect(peripheral.id).then(() => {
        peripheral.connected = false;
        setConnected(false);
        alert(`Disconnected from ${peripheral.name}`);
      });
    } else {
      BleManager.connect(peripheral.id)
        .then(() => {
          let peripheralResponse = peripherals.get(peripheral.id);
          if (peripheralResponse) {
            peripheralResponse.connected = true;
            peripherals.set(peripheral.id, peripheralResponse);
            setConnected(true);
            setBluetoothDevices(Array.from(peripherals.values()));
          }
          alert('Connected to ' + peripheral.name);
        })
        .catch(error => console.log(error));
      /* Read current RSSI value */
      setTimeout(() => {
        BleManager.retrieveServices(peripheral.id).then(peripheralData => {
          console.log('Peripheral services:', peripheralData);
        });
      }, 900);
    }
  };

  const RenderItem = ({peripheral}) => {
    const color = peripheral.connected ? 'green' : '#fff';
    return (
      <>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginBottom: 5,
           
          }}>
          Nearby Devices:
        </Text>
        <TouchableOpacity onPress={() => connectToPeripheral(peripheral)}>
          <View
            style={{
              backgroundColor: color,
              borderRadius: 5,
              paddingVertical: 5,
              marginHorizontal: 10,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                textTransform: 'capitalize',
                color: connected ? Colors.white : Colors.black,
              }}>
              {peripheral.name}
            </Text>
            <View
              style={{
                backgroundColor: color,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: connected ? Colors.white : Colors.black,
                }}>
                RSSI: {peripheral.rssi}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: connected ? Colors.white : Colors.black,
                }}>
                ID: {peripheral.id}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

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
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
              'Location Access Denied',
              'You have denied location access and selected "Don\'t ask again". To enable location access, go to the app settings.',
              [
                {text: 'Cancel'},
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
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
        if (error.code === error.PERMISSION_DENIED) {
          Alert.alert(
            'Location Access Denied',
            'Location permission was not granted. To enable location access, go to the app settings.',
            [
              {text: 'Cancel'},
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        } else {
          setLocationStatus(error.message);
        }
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
        <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
              
              }}>
              React Native BLE Manager Tutorial
            </Text>
         
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={startScan}>
            <Text style={styles.buttonTextStyle}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* list of scanned bluetooth devices */}
        {bluetoothDevices.map(device => (
          <View key={device.id}>
            <RenderItem peripheral={device} />
          </View>
        ))}

        <View style={styles.savebutton}>
          <Button title="Save Category" onPress={handleSave} color="teal" />
        </View>
      </View>
    </ScrollView>
  );
}
