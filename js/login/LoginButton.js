/*
 * @flow
 */
'use strict'

import React, {Component} from 'React'
import StyleSheet from 'StyleSheet'
import InshaButton from 'InshaButton'
import { logInWithFacebook } from '../actions'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

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

  state = {isLoading: false}

  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  async logIn() {
    const {dispatch, onLoggedIn, socialSignIn, form} = this.props

    this.setState({isLoading: true})

    let action = socialSignIn === 'facebook'
      ? logInWithFacebook
      : form === 'signIn'
        ? () => {}
        : () => {}

    try {
      await Promise.race([
        dispatch(action(this.props.source)),
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

    const {socialSignIn, type} = this.props
    let icon
    if (type === 'secondary') {
      icon = <Icon style={styles.icon} name="mail-outline" size={22} color="#ffffff" />
    } else if (socialSignIn === 'fb') {
      icon = require('../login/img/f-logo.png')
    }

    return (
      <InshaButton
        style={[styles.button, this.props.style]}
        icon={icon}
        type={type}
        caption={socialSignIn === 'fb'
          ? 'Sign in with Facebook'
          : type === 'bordered'
            ? this.props.caption
            : 'Sign in with Email'
        }
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
  icon: {
    marginRight: 0,
    position: 'relative',
    right: 20
  },
  signInMail: {

  }
})

export default connect()(LoginButton)
