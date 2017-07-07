import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  getStore,
} from 'Common/redux/store';
import App from 'Common/components/App';
import BLEManager from 'Common/components/BLEManager';

const ProvidedApp = () => {
  return (
    <Provider store={getStore()}>
      <BLEManager>
        <App />
      </BLEManager>
    </Provider>
  );
};

export default ProvidedApp;
