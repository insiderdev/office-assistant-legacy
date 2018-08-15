import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import './src/styles';

import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={(
          <View style={styles.container}>
            <ActivityIndicator color="#FFFFFF" />
          </View>
        )}
        persistor={persistor}
      >
        <AppView />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
