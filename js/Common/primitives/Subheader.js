import React, { PropTypes } from 'react';
import styled from 'styled-components/primitives';
import theme from './theme.json';

const StyledSubheader = styled.Text`
  color: ${props => (props.inverted ? theme.textInverted : theme.text)};
  font-size: 22px;
  font-family: ${theme.font};
  font-weight: ${theme.weight};
`;


const Subheader = (props, context) => (
  <StyledSubheader
    inverted={context.inverted}
    {...props}
  />
);

Subheader.contextTypes = {
  inverted: PropTypes.bool,
};

export default Subheader;
