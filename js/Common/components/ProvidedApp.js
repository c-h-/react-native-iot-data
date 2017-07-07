import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  getStore,
} from 'Common/redux/store';
import App from 'Common/components/App';

const ProvidedApp = () => {
  return (
    <Provider store={getStore()}>
      <App />
    </Provider>
  );
};

export default ProvidedApp;
