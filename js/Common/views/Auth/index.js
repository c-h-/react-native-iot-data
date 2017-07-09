import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import I18n from 'react-native-i18n';
import styled from 'styled-components/primitives';
import P from 'Common/primitives/P';

import styles from './styles';

const Header = styled.Text`
  color: red;
  font-size: 50px;
`;

const Translation = () => {
  return (
    <View style={styles.container}>
      <P>{process.env.TARGET_MODE}</P>
      <Header>Translated greeting:</Header>
      <P danger>{I18n.t('greeting')}</P>
    </View>
  );
};

export default Translation;
