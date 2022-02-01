import React from 'react';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/ConfigureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';
import * as Font from 'expo-font';
import { View } from 'react-native';

const { persistor, store } = ConfigureStore()
export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'DancingScript': require('./assets/fonts/DancingScript-Bold.ttf'),
    'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
    'QuicksandBold': require('./assets/fonts/Quicksand-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
        >
        <Main />
      </PersistGate>
    </Provider>
  );
}
