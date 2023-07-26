import React, {useState} from 'react';

import HomeStack from './Navigation/HomeStack';
import AutheticationStack from './Navigation/AuthenticationStack';
import {storage} from './Storage';

const token = storage.getString('token');

const App = () => {
  return <>{token ? <HomeStack /> : <AutheticationStack />}</>;
};

export default App;
