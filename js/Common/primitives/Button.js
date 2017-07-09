import React, { PropTypes } from 'react';
import styled from 'styled-components/primitives';
import Link from 'Common/components/Link';
import Icon from 'Common/components/Icon';

import theme from './theme.json';

function getContrast(strong = true) {
  return strong ? theme.primary : theme.textInverted;
}

function getColor(props, foreground = true) {
  const {
    secondary,
    inverted,
  } = props;
  const realInversion = foreground ? inverted : !inverted;
  const strong = realInversion ? getContrast(true) : getContrast(false);
  const weak = realInversion ? getContrast(false) : getContrast(true);
  return secondary ? weak : strong;
}

const StyledView = styled.View`
  flex: 1;
  backgroundColor: ${props => getColor(props, false)};
  border: 4px solid ${props => (props.inverted ? getContrast(false) : getContrast(true))};
  borderRadius: ${2 * theme.unit}px;
  min-height: ${3 * theme.unit}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 ${0.5 * theme.unit}px;
`;

const StyledText = styled.Text`
  color: ${props => getColor(props, true)};
  font-family: ${theme.font};
  font-weight: 600;
  font-size: 18px;
`;

const Button = ({
  href,
  style,
  containerStyle,
  icon,
  secondary,
  children,
}, context) => {
  console.log('CONTEXT', context);
  const passProps = {
    inverted: context.inverted,
    secondary,
  };
  return (
    <Link
      href={href}
      containerStyle={[{ flexGrow: 1, flexShrink: 1, height: 3 * theme.unit }, containerStyle]}
    >
      <StyledView
        style={style}
        {...passProps}
      >
        {
          icon &&
          <Icon
            name={icon}
            color={getColor(passProps, true)}
            style={{ marginRight: theme.unit / 2 }}
          />
        }
        <StyledText {...passProps}>
          {children || null}
        </StyledText>
      </StyledView>
    </Link>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  icon: PropTypes.string,
  secondary: PropTypes.bool,
  children: PropTypes.any,
};

Button.contextTypes = {
  inverted: PropTypes.bool,
};

export default Button;
