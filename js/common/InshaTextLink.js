/*
* @providesModule InshaTextLink
* @flow
*/

'use strict'
import React from 'React'
import View from 'View'
import StyleSheet from 'StyleSheet'
import TouchableOpacity from 'TouchableOpacity'
import {InshaText} from 'InshaText'

function InshaTextLink({
  text,
  style,
  textStyle,
  onPress,
  toucheableProps,
  ...props
}: Object): ReactElement {
  return (
    <TouchableOpacity style={style} activeOpacity={0.7} onPress={() => {}} {...props}>
      <View>
        <InshaText style={[styles.textStyle, textStyle]}>{text}</InshaText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#ffffff'
  }
})

export default InshaTextLink
