import React, {
  PropTypes,
} from 'react';
import {
  StackRouter,
} from 'react-navigation';

import AppFrame from './AppFrame';

export default (stackRoutes, options) => {
  const Router = StackRouter(stackRoutes, options);

  const AppNavigator = ({ navigation }) => {
    return (
      <AppFrame
        router={Router}
        navigation={navigation}
        tabBarOptions={options.tabBarOptions}
      />
    );
  };
  AppNavigator.router = Router;

  AppNavigator.propTypes = {
    navigation: PropTypes.object,
  };

  return AppNavigator;
};
