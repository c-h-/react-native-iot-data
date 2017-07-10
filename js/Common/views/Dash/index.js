import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import Page from 'Common/primitives/Page';
import Header from 'Common/primitives/Header';
import Subheader from 'Common/primitives/Subheader';
import P from 'Common/primitives/P';
import Button from 'Common/primitives/Button';

export default ({ ...props }) => {
  return (
    <Page ui inverted>
      <Header>Dashboard</Header>
      <P>Start a recording session by tapping below</P>
      <Button
        href="session/intro"
        icon="hotel"
      >
        Time For Bed
      </Button>
      <Subheader>Your Sessions</Subheader>
      <P>Progress bar goes here</P>
      <Button
        href="results"
        icon="bubble-chart"
        secondary
      >
        Diagnosis
      </Button>
      <P>Share your results</P>
      <Button
        href="share"
        icon="supervisor-account"
        secondary
      >
        Share
      </Button>
    </Page>
  );
};
