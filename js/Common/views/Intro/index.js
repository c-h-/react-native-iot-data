import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import Page from 'Common/primitives/Page';
import Header from 'Common/primitives/Header';
import Toolbar from 'Common/primitives/Toolbar';
import P from 'Common/primitives/P';
import Button from 'Common/primitives/Button';

export default ({ ...props }) => {
  return (
    <Page ui inverted>
      <Header>Put on the sticker</Header>
      <P>1. Lightly clench your jaw</P>
      <P>2. Feel the corner of your cheek for a tight muscle</P>
      <P>3. Unclench your jaw</P>
      <P>4. Place the sticker on your cheek where the tight muscle was</P>

      <Toolbar>
        <Button
          back
          secondary
        >
          Back
        </Button>
        <Button
          href="session/intro"
          icon="forward"
        >
          Ok, I'm Ready
        </Button>
      </Toolbar>
    </Page>
  );
};
