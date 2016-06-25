/*
* @flow
*/

'use strict'

import React, {Component} from 'React'
import AppState from 'AppState'
import StyleSheet from 'StyleSheet'
import {connect} from 'react-redux'
import View from 'View'
import Text from 'Text'
import StatusBar from 'StatusBar'
import LoginScreen from './login/LoginScreen'
import InshaNavigator from 'InshaNavigator'

class InshaApp extends Component {
 componentDidMount() {
   AppState.addEventListener('change', this.handleAppStateChange);
 }
 componentWillUnmount() {
   AppState.removeEventListener('change', this.handleAppStateChange);
 }
 handleAppStateChange(appState) {
   if (appState === 'active') {
     // Do something
   }
 }

 render() {
   if (!this.props.isLoggedIn) {
     return <LoginScreen />
   }

   return (
     <View style={styles.container}>
       <StatusBar
         translucent={true}
         backgroundColor="rgba(0, 0, 0, 0.2)"
         barStyle="light-content"
        />
       <InshaNavigator />
     </View>
   );
 }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
})

const select = (state) => ({isLoggedIn: state.user.isLoggedIn})

export default connect(select)(InshaApp)
