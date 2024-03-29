import React, { PropTypes } from 'react';
import styled from 'styled-components/primitives';
import theme from './theme.json';

const StyledP = styled.Text`
  color: ${props => (props.inverted ? theme.textInverted : theme.text)};
  font-size: 16px;
  margin-bottom: ${theme.pad};
`;

const P = (props, context) => (
  <StyledP
    inverted={context.inverted}
    {...props}
  />
);

P.contextTypes = {
  inverted: PropTypes.bool,
};

export default P;

