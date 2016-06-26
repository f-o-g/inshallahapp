/*
 * @flow
 */
'use strict'

import React, {Component} from 'React'
import StyleSheet from 'StyleSheet'
import InshaButton from 'InshaButton'
import { logInWithFacebook } from '../actions'
import {connect} from 'react-redux'

class LoginButton extends Component {
  props: {
    style: any;
    source?: string; // For Analytics
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
    socialSignIn?: string;
  }
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  state = { isLoading: false }

  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  async logIn() {
    const {dispatch, onLoggedIn, socialSignIn} = this.props

    this.setState({isLoading: true})

    let logInAction = socialSignIn === 'facebook'
      ? logInWithFacebook
      : () => {}// normal log in

    try {
      await Promise.race([
        dispatch(logInAction(this.props.source)),
        timeout(15000),
      ])
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message)
        console.warn(e)
      }
      return
    } finally {
      this._isMounted && this.setState({isLoading: false})
    }

    onLoggedIn && onLoggedIn()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <InshaButton
          style={[styles.button, this.props.style]}
          type={!socialSignIn && 'bordered'}
          caption="Please wait..."
        />
      );
    }

    const socialSignIn = this.props.socialSignIn
    return (
      <InshaButton
        style={[styles.button, this.props.style]}
        icon={socialSignIn === 'fb' && require('../login/img/f-logo.png')}
        type={!socialSignIn && 'bordered'}
        caption={socialSignIn === 'fb' ? 'Sign in with Facebook' : 'Sign in'}
        onPress={() => this.logIn()}
      />
    );
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms)
  })
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
})

export default connect()(LoginButton)
