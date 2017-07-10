import React, { PropTypes } from 'react';
import styled from 'styled-components/primitives';
import UIContainer from 'Common/primitives/UIContainer';

const StyledView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const Page = ({ ui, children, ...props }) => {
  return (
    <StyledView>
      {
        ui
        ? (
          <UIContainer {...props}>
            {children || null}
          </UIContainer>
        ) : (
          children || null
        )
      }
    </StyledView>
  );
};

Page.propTypes = {
  ui: PropTypes.bool,
  children: PropTypes.any,
};

export default Page;
