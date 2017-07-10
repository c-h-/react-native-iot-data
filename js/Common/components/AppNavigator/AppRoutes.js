import React, {
  PropTypes,
} from 'react';

import Icon from 'Common/components/Icon';

import Home from 'Common/views/Home';
import Dash from 'Common/views/Dash';
import Auth from 'Common/views/Auth';
import Intro from 'Common/views/Intro';
import NotFound from 'Common/views/NotFound';

export const notFoundKey = 'NotFound';

/**
 * Gets an Icon component.
 */
const getIcon = (name) => {
  const comp = ({ tintColor }) => (
    <Icon
      name={name}
      style={{
        color: tintColor,
      }}
    />
  );
  comp.propTypes = {
    tintColor: PropTypes.string,
  };
  return comp;
};

/**
 * The routes for the App
 */
export const AppRoutes = {
  home: {
    screen: Home,
    path: 'home',
    navigationOptions: {
      title: 'Welcome',
      stack: {
        label: 'Welcome',
        icon: getIcon('home'),
      },
    },
  },
  dash: {
    screen: Dash,
    path: 'dash',
    navigationOptions: {
      title: 'Icons',
      stack: {
        label: 'Icons',
        icon: getIcon('view-module'),
      },
    },
  },
  'session/intro': {
    screen: Intro,
    path: 'session/intro',
    navigationOptions: {
      title: 'Session Intro',
      stack: {
        label: 'Session Intro',
        icon: getIcon('view-module'),
      },
    },
  },
  'auth/register': {
    screen: Auth,
    path: 'auth/register',
    navigationOptions: {
      title: 'Sign Up',
      stack: {
        label: 'Sign Up',
        icon: getIcon('translate'),
      },
    },
  },
  'auth/login': {
    screen: Auth,
    path: 'auth/login',
    navigationOptions: {
      title: 'Sign In',
      stack: {
        label: 'Sign In',
        icon: getIcon('translate'),
      },
    },
  },
  '404': {
    screen: NotFound,
    path: '404',
    navigationOptions: {
      title: 'Nothing Found',
    },
  },
};
