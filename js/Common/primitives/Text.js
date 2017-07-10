import React, { PropTypes } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/primitives';
import Subheader from 'Common/primitives/Subheader';

import { getColor, getContrast } from './helpers';

import theme from './theme.json';

const StyledView = styled.View`
  margin-bottom: ${2 * theme.unit}px;
`;

const Text = ({
  label,
  ...props
}, context) => {
  const textStyle = {
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: context.inverted ? getContrast(false) : getContrast(true),
    padding: theme.unit / 2,
    fontSize: 18,
    borderRadius: 15,
  };
  return (
    <StyledView>
      {
        label &&
        <Subheader>{label}</Subheader>
      }
      <TextInput
        style={textStyle}
        {...props}
      />
    </StyledView>
  );
};

Text.propTypes = {
  label: PropTypes.string,
};

Text.contextTypes = {
  inverted: PropTypes.bool,
};

export default Text;
