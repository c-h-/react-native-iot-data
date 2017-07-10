import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import Page from 'Common/primitives/Page';
import Header from 'Common/primitives/Header';
import P from 'Common/primitives/P';
import UIContainer from 'Common/primitives/UIContainer';
import Button from 'Common/primitives/Button';
import Toolbar from 'Common/primitives/Toolbar';
import TextInput from 'Common/primitives/TextInput';

class Auth extends Component {
  state = {
    email: '',
    password: '',
  }
  updateVal = (key) => {
    return (e) => {
      this.setState({
        [key]: e.target.value,
      });
    };
  }
  render() {
    const {
      email,
      password,
    } = this.state;
    return (
      <Page>
        <UIContainer
          containerStyle={{ flexGrow: 0, minHeight: 200 }}
          style={{ justifyContent: 'flex-end' }}
          inverted
        >
          <Header>Hello.</Header>
        </UIContainer>
        <UIContainer>
          <TextInput
            value={email}
            onChange={this.updateVal('email')}
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />
          <TextInput
            value={password}
            onChange={this.updateVal('password')}
            label="Password"
            secureTextEntry
          />
          <Toolbar>
            <Button
              back
              secondary
            >
              Back
            </Button>
            <Button
              href={'dash'}
              icon="forward"
            >
              Get Started
            </Button>
          </Toolbar>
        </UIContainer>
      </Page>
    );
  }
}

export default Auth;
