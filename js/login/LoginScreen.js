/*
* @flow
*/

'use strict'

import React, {Component} from 'react'
import StyleSheet from 'StyleSheet'
import View from 'View'
import Image from 'Image'
import Animated from 'Animated'
import Dimensions from 'Dimensions'
import InshaTextLink from 'InshaTextLink'
// import StatusBarIOS from 'StatusBarIOS'
import {connect} from 'react-redux'
import LoginButton from './LoginButton'
import InshaTextField from 'InshaTextField'

class LoginScreen extends Component {
  state = {
    anim: new Animated.Value(0),
  }
  componentDidMount() {
    // StatusBarIOS && StatusBarIOS.setStyle('default')
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start()
  }

  fadeIn(delay, from = 0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('./img/login-background.png')}>
        <View style={styles.section}>
          <Animated.Image
            style={[styles.logo, this.fadeIn(0)]}
            source={require('./img/logo.png')}
          />
          <Animated.Text style={[styles.h1, this.fadeIn(500)]}>
            Inshallahapp
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, this.fadeIn(1500)]}>
          <View style={styles.fields}>
            <InshaTextField
              placeholder="Email Adress"
              keyboardType="email-address"
              style={styles.field}
              onChangeText={(text) => {}}
            />
            <InshaTextField
              placeholder="Password"
              secureTextEntry
              style={styles.field}
              onChangeText={(text) => {}}
            />
          </View>
          <LoginButton style={styles.button}/>
          <LoginButton style={styles.button} socialSignIn="fb"/>
          <InshaTextLink
            text="Forgot your password?"
            onPress={()=>{}}
            textStyle={styles.forgotPasswordText}
          />
        </Animated.View>
      </Image>
    )
  }
}

const scale = Dimensions.get('window').width / 375

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Remove when get proper image size
    width: 160,
    height: 160
  },
  h1: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: Math.round(25 * scale),
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  fields: {
    marginBottom: 60,
  },
  field: {
    width: 270,
    marginBottom: 10
  },
  buttons: {

  },
  button: {
    marginBottom: 25
  },
  forgotPasswordText: {
    fontSize: Math.round(10 * scale),
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  }
})

export default connect()(LoginScreen)
