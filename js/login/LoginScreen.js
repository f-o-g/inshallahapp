/*
* @flow
*/

'use strict'

import React, {Component} from 'react'
import StyleSheet from 'StyleSheet'
import View from 'View'
import Text from 'Text'
// import Image from 'Image'
import Animated from 'Animated'
// import StatusBarIOS from 'StatusBarIOS'
// import ToucheableOpacity from 'ToucheableOpacity'
import {connect} from 'react-redux'
// import LoginButton from '../common/LoginButton'

class LoginScreen extends Component {
  state = {
    anim: new Animated.Value(0),
  }
  // componentDidMount() {
  //   StatusBarIOS && StatusBarIOS.setStyle('default')
  //   Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start()
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect()(LoginScreen)
