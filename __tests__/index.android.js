/* global it:false */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ProvidedApp from '../js/components/ProvidedApp';


it('renders correctly', () => {
  renderer.create(
    <ProvidedApp />
  );
});
