
import React from 'react';

import { SafeAreaView , Text} from 'react-native';
import { Provider } from 'react-redux';
import Store from './reducers/index'
import AuthNavigator from './Navigator/AuthNavigator'


const App = () => {
  

  return (
    <Provider store={Store}>
        <AuthNavigator />
    </Provider>
    );
};



export default App;
