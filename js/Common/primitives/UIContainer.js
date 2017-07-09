import React, { Component, PropTypes } from 'react'; 
import styled from 'styled-components/primitives';
import theme from './theme.json';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: ${props => (props.inverted ? theme.primary : theme.textInverted)}
`;

const InnerContainer = styled.View`
  padding: ${2 * theme.unit}px ${theme.pad};
  flex: 1;
  max-width: 400;
`;

class UIContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    containerStyle: PropTypes.object,
    inverted: PropTypes.bool,
  }
  static childContextTypes = {
    inverted: PropTypes.bool,
  }
  getChildContext() {
    const {
      inverted,
    } = this.props;
    return {
      inverted: Boolean(inverted),
    };
  }
  render() {
    const {
      inverted,
      containerStyle,
      children,
    } = this.props;
    return (
      <Container inverted={inverted} style={containerStyle}>
        <InnerContainer>
          {children || null}
        </InnerContainer>
      </Container>
    );
  }
}

export default UIContainer;
