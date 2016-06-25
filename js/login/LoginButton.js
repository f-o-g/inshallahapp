/*
 * @flow
 */
'use strict'

import React, {Component} from 'react'
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
    const {dispatch, onLoggedIn} = this.props

    this.setState({isLoading: true})
    try {
      await Promise.race([
        dispatch(logInWithFacebook(this.props.source)),
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
          caption="Please wait..."
        />
      );
    }

    return (
      <InshaButton
        style={[styles.button, this.props.style]}
        icon={require('../login/img/f-logo.png')}
        caption="Log in with Facebook"
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
