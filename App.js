import React from 'react';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/ConfigureStore';
import { Provider } from 'react-redux';

const store = ConfigureStore()
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
