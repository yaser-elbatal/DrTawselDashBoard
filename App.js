import React, { useState, useEffect } from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';

import MainRoot from './routes/Index';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store/index';
import './ReactotronConfig';
import { Root } from 'native-base';

export default function App() {
  const [isLoading, setisLoading] = useState(true);





  useEffect(() => {
    // I18nManager.forceRTL(true)

    async function loadFont() {
      await Font.loadAsync({
        flatLight: require('./assets/fonts/JF-Flat-light.ttf'),
        flatMedium: require('./assets/fonts/JF-Flat-medium.ttf'),
        flatRegular: require('./assets/fonts/JF-Flat-regular.ttf'),
        ...Ionicons.font,
      });


      setisLoading(false)
    }
    loadFont();

  }, []);

  if (isLoading) {
    return <AppLoading />;
  } else {

    return (

      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Root>
            <MainRoot />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

