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
import InshaButton from 'InshaButton'
import SignForm from './SignForm'
import Icon from 'react-native-vector-icons/MaterialIcons'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.onLinkPressed = this.onLinkPressed.bind(this)
    this.onButtonPressed = this.onButtonPressed.bind(this)
  }

  state = {
    anim: new Animated.Value(0),
    showForm: false,
    form: undefined
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

  onButtonPressed(type) {

    if (this.state.showFormSignUp) {
      // sign up
    } else {
      this.setState({showFormSignUp: true, form: type})
    }
  }

  onLinkPressed(link) {
    if (link === 'back' && this.state.showFormSignUp) {
      this.setState({showFormSignUp: false})
    } else {
      // to do
    }
  }

  render() {
    const {showFormSignUp, form} = this.state

    let SignFormInputs
    let SignInButtons
    if (showFormSignUp) {
      SignFormInputs = <SignForm form={form}/>
    } else {
      SignInButtons = (
        <View>
          <LoginButton
            style={styles.button}
            type="primary"
            socialSignIn="fb"
          />
          <InshaButton
            style={styles.button}
            icon={<Icon style={styles.icon} name="mail-outline" size={22} color="#ffffff" />}
            caption="Sign in with Email"
            type="secondary"
            onPress={() => this.onButtonPressed('signIn')}
          />
        </View>
      )
    }

    let SignUpButton
    if (!showFormSignUp) {
      SignUpButton = <InshaButton
                  style={[styles.button, styles.signUp]}
                  type="bordered"
                  caption="Sign Up"
                  onPress={() => this.onButtonPressed('signUp')}
                />
    } else {
      SignUpButton = <LoginButton
                  style={styles.button}
                  type="bordered"
                  form={form}
                  caption={form === 'signIn' ? 'Sign In' : 'Sign Up'}
               />
    }

    let Links
    if (!showFormSignUp) {
      Links = <InshaTextLink
        text="Forgot your password?"
        onPress={this.onLinkPressed}
        textStyle={styles.forgotPasswordText}
      />
    } else {
      Links = (
        <View style={styles.links}>
          <InshaTextLink
            text="Back"
            onPress={() => this.onLinkPressed('back')}
            textStyle={styles.forgotPasswordText}
          />
          <InshaTextLink
            text="Forgot your password?"
            onPress={() => this.onLinkPressed('forgotPassword')}
            textStyle={styles.forgotPasswordText}
          />
        </View>
      )
    }

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
          {SignFormInputs || SignInButtons}
          {SignUpButton}
          {Links}
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
    width: 110,
    height: 110
  },
  h1: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: Math.round(25 * scale),
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttons: {

  },
  button: {
    marginBottom: 15
  },
  signUp: {
    alignSelf: 'center',
    width: 270,
  },
  icon: {
    marginRight: 0,
    position: 'relative',
    right: 20
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270
  },
  forgotPasswordText: {
    fontSize: Math.round(10 * scale),
    color: '#ffffff',
    backgroundColor: 'transparent',
  }
})

export default connect()(LoginScreen)
