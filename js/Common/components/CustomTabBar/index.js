import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import Link from 'Common/components/Link';

import styles from './styles';

const CustomTabBar = ({ navigation, router, tabBarOptions }) => {
  const links = navigation.state ? [
    ...navigation.state.routes.map((route, i) => {
      if (route.routeName === 'NotFound') {
        return null;
      }
      const isActive = i === navigation.state.index;
      const nav = {
        state: route,
      };
      const tabBarConfig = router.getScreenConfig(nav, 'tabBar');
      let icon;
      let label;
      let activeStyles = {
        backgroundColor: '#eee',
      }
      if (tabBarOptions) {
        if (typeof tabBarOptions.showIcon !== 'boolean' || tabBarOptions.showIcon) {
          icon = typeof tabBarConfig.icon === 'function'
            ? tabBarConfig.icon({
              tintColor: isActive ? tabBarOptions.activeTintColor : tabBarOptions.inactiveTintColor,
            })
            : tabBarConfig.icon;
        }
        if (typeof tabBarOptions.showLabel !== 'boolean' || tabBarOptions.showLabel) {
          label = tabBarConfig.label;
        }
        activeStyles = isActive ? {
          backgroundColor: tabBarOptions.activeBackgroundColor,
        } : {
          backgroundColor: tabBarOptions.inactiveBackgroundColor,
        };
      }
      const tabStyle = tabBarOptions && tabBarOptions.tabStyle ? tabBarOptions.tabStyle : null;
      const labelStyle = tabBarOptions && tabBarOptions.labelStyle ? tabBarOptions.labelStyle : null;
      return (
        <Link
          href={route.routeName}
          key={route.routeName}
          style={styles.link}
          containerStyle={[
            styles.linkContainer,
            tabStyle,
            activeStyles,
          ]}
        >
          {icon}
          <Text
            style={labelStyle}
          >
            {label}
          </Text>
        </Link>
      );
    }),
  ] : [];

  const style = tabBarOptions && tabBarOptions.style ? tabBarOptions.style : null;
  return (
    <View
      style={[styles.customStack, style]}
    >
      {links}
    </View>
  );
};

CustomTabBar.propTypes = {
  navigation: PropTypes.object,
  router: PropTypes.object,
  tabBarOptions: PropTypes.object,
};

export default CustomTabBar;
