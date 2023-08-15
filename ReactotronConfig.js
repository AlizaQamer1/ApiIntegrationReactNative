

  
import { MMKV } from 'react-native-mmkv';
import Reactotron from 'reactotron-react-native';

const host = '192.168.30.167';
const reactotron = Reactotron.configure({
  name: 'ApiIntegration',
  host,
})
  .useReactNative()
  .connect();

const storage = new MMKV();

export const logToConsole = params => {
  if (__DEV__) {
    reactotron.warn(params);
    console.log(params);
  }
};

export const logNavigationToConsole = (value, name = 'NAVIGATION', config) => {
  if (__DEV__) {
    reactotron.display({
      name: name,
      value,
      preview: name,
      ...config,
    });
    console.log("value", value);
  }
};
