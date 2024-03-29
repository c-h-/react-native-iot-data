import React, {
  PropTypes,
} from 'react';
import styled from 'styled-components/primitives';
import Header from 'Common/primitives/Header';
import P from 'Common/primitives/P';
import UIContainer from 'Common/primitives/UIContainer';
import Button from 'Common/primitives/Button';
import Toolbar from 'Common/primitives/Toolbar';
import Page from 'Common/primitives/Page';

import theme from 'Common/primitives/theme.json';

const photos = {
  hammock: 'https://images.unsplash.com/photo-1474022650697-7624c32312fa?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=',
  skylight: 'https://images.unsplash.com/photo-1455026733626-d2d31efe4976?dpr=2&auto=format&fit=crop&w=1080&h=721&q=80&cs=tinysrgb&crop=',
  coffee: 'https://images.unsplash.com/photo-1422433555807-2559a27433bd?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=',
  alarm: 'https://images.unsplash.com/photo-1478980236323-01c287f81aed?dpr=2&auto=format&fit=crop&w=1080&h=717&q=80&cs=tinysrgb&crop=',
};

const HeroContainer = styled.View`
  height: 300px;
  align-self: stretch;
  background-color: ${theme.primary};
`;

const HeroImage = styled.Image`
  flex: 1;
  background-position: bottom;
`;

const Home = () => {
  return (
    <Page>
      <HeroContainer>
        <HeroImage
          source={{ uri: photos.coffee }}
        />
      </HeroContainer>
      <UIContainer inverted>
        <Header>
          Welcome
        </Header>
        <P>
          Get insight into your sleeping life.
        </P>
        <Toolbar>
          <Button
            href={'auth/register'}
            secondary
          >
            Sign Up
          </Button>
          <Button
            href={'auth/login'}
            icon="forward"
          >
            Sign In
          </Button>
        </Toolbar>
      </UIContainer>
    </Page>
  );
};

Home.contextTypes = {
  store: PropTypes.object,
};

export default Home;
