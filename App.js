import { Provider } from 'react-redux';
import React from 'react';
import { Button } from 'react-native-ui-lib';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import './src/styles';

import { store, persistor } from './src/redux/store';

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
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button label="Let's get started!" />
        </View>
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
