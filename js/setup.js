/*
* @flow
*/

'use strict'

import InshaApp from './InshaApp'
import React, {Component} from 'React'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

function setup(): React.Component {
 console.disableYellowBox = true

 class Root extends Component {
   constructor() {
     super()
     this.state = {
       isLoading: true,
       store: configureStore(() => this.setState({isLoading: false})),
     };
   }
   render() {
     if (this.state.isLoading) {
       return null
     }
     return (
       <Provider store={this.state.store}>
         <InshaApp />
       </Provider>
     );
   }
 }

 return Root;
}

global.LOG = (...args) => {
 console.log('/------------------------------\\')
 console.log(...args)
 console.log('\\------------------------------/')
 return args[args.length - 1]
}

export default setup
