/*
* @providesModule InshaNavigator
* @flow
*/

'use strict';

import React, {Component, PropTypes} from 'React'
import Platform from 'Platform'
import BackAndroid from 'BackAndroid'
import Navigator from 'Navigator'
import StyleSheet from 'StyleSheet'
import {connect} from 'react-redux'


class InshaNavigator extends Component {
 _handlers: Array<() => boolean>;

 componentDidMount() {
   BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
 }
 componentWillUnmount() {
   BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
 }
 getChildContext() {
   return {
     addBackButtonListener: this.addBackButtonListener,
     removeBackButtonListener: this.removeBackButtonListener,
   }
 }

 addBackButtonListener(listener) {
   this._handlers.push(listener)
 }
 removeBackButtonListener(listener) {
   this._handlers = this._handlers.filter((handler) => handler !== listener)
 }
 handleBackButton() {
   for (let i = this._handlers.length - 1; i >= 0; i--) {
     if (this._handlers[i]()) {
       return true
     }
   }

   const {navigator} = this.refs
   if (navigator && navigator.getCurrentRoutes().length > 1) {
     navigator.pop()
     return true
   }

  //  if (this.props.tab !== 'schedule') {
  //    this.props.dispatch(switchTab('schedule'))
  //    return true
  //  }
   return false
 }

 render() {
   return (
     <Navigator
       ref="navigator"
       style={styles.container}
       configureScene={(route) => {
         if (Platform.OS === 'android') {
           return Navigator.SceneConfigs.FloatFromBottomAndroid
         }
        //  if (route.shareSettings || route.friend) {
        //    return Navigator.SceneConfigs.FloatFromRight
        //  } else {
        //    return Navigator.SceneConfigs.FloatFromBottom
        //  }
       }}
       initialRoute={{}}
       renderScene={this.renderScene}
     />
   )
 }

 renderScene(route, navigator) {
  //  if (route.login) {
  //    return (
  //      <LoginModal
  //        navigator={navigator}
  //        onLogin={route.callback}
  //      />
  //     )
  //   }
  //   return <F8TabsView navigator={navigator} />
  }
}

InshaNavigator.childContextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})

// function select(store) {
//   return {
//     tab: store.navigation.tab,
//     isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
//   }
// }

export default connect()(InshaNavigator)
