import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import Link from 'Common/components/Link';

import styles from './styles';

class CustomStackHeader extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    // router: PropTypes.object,
    stackOptions: PropTypes.object,
  }
  static _renderBackButton(index) {
    if (index === 0) {
      return null;
    }
    return (
      <Link back>Back</Link>
    );
  }
  render() {
    const {
      navigation,
      // router,
      stackOptions,
    } = this.props;
    const index = navigation && navigation.state ? navigation.state.index : 0;

    const style = stackOptions && stackOptions.style ? stackOptions.style : null;
    return (
      <View
        style={[styles.customStack, style]}
      >
        {CustomStackHeader._renderBackButton(index)}
      </View>
    );
  }
}

export default CustomStackHeader;
