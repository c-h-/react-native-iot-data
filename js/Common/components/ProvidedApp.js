import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  getStore,
} from 'Common/redux/store';
import App from 'Common/components/App';
import BLEProvider from 'Common/components/BLEProvider';

const ProvidedApp = () => {
  return (
    <Provider store={getStore()}>
      <BLEProvider>
        <App />
      </BLEProvider>
    </Provider>
  );
};

export default ProvidedApp;
