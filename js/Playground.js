/*
* @flow
*/

'use strict'

import React from 'React'
import View from 'View'

class Playground extends React.Component {
 constructor() {
   super()
   const content = []
   const define = (name: string, render: Function) => {
     content.push(<Example key={name} render={render} />)
   }
   // var Module = require('F8PageControl');
  //  var Module = require('F8Header');
   // var Module = require('./tabs/schedule/AddToScheduleButton');
   // var Module = require('./rating/Header');
  //  Module.__cards__(define);
   this.state = {content};
 }

 render() {
   return (
     <View style={{backgroundColor: '#336699', flex: 1,}}>
       {this.state.content}
     </View>
   );
 }
}

class Example extends React.Component {
 constructor(props) {
   super(props)
   this.state = {}
 }

 render() {
   const content = this.props.render(
     this.state.inner, (inner) => this.setState({inner})
   )

   return (
     <View>
       {content}
     </View>
   );

 }
}

export default Playground
