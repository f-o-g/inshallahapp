/*
* @providesModule InshaTextField
* @flow
*/

'use strict'
import React from 'React'
import View from 'View'
import TextInput from 'TextInput'
import StyleSheet from 'StyleSheet'
import InshaColors from 'InshaColors'

function InshaTextField({style, textStyle, ...props}: Object): ReactElement {
  return (
    <View style={style}>
      <TextInput
        placeholderTextColor="#ffffff"
        style={styles.textStyle}
        underlineColorAndroid="#ffffff"
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#ffffff',
    height: 50
  }
})

export default InshaTextField
