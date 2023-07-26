import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './Navigation/HomeStack';
import AutheticationStack from './Navigation/AuthenticationStack';

const App = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <NavigationContainer>
    
      {isAuthenticated ? <HomeStack /> : <AutheticationStack />}
    </NavigationContainer>
  );
};

export default App;
