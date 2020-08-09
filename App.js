/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';
import RibbonLoader from './src';

const App: () => React$Node = () => {
  return (
    <>
      <View>
        <RibbonLoader />
        <Text>hello</Text>
      </View>
    </>
  );
};

export default App;
