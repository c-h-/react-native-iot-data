import React, {
  PropTypes,
} from 'react';

import Icon from 'Common/components/Icon';

import Home from 'Common/views/Home';
import Pages from 'Common/views/Pages';
import BuildingBlocks from 'Common/views/BuildingBlocks';
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
    path: 'editor',
    navigationOptions: {
      title: 'Welcome',
      stack: {
        label: 'Welcome',
        icon: getIcon('home'),
      },
    },
  },
  pages: {
    screen: Pages,
    path: 'pages',
    navigationOptions: {
      title: 'Icons',
      stack: {
        label: 'Icons',
        icon: getIcon('view-module'),
      },
    },
  },
  'building-blocks': {
    screen: BuildingBlocks,
    path: 'building-blocks',
    navigationOptions: {
      title: 'Translation',
      stack: {
        label: 'Translation',
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
