/*
 * @flow
 */
'use strict'

import React from 'React'
import StyleSheet from 'StyleSheet'
import View from 'View'
import InshaTextField from 'InshaTextField'

function SignForm({style, ...props}: Object): ReactElement {
  return (
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
  )
}

const styles = StyleSheet.create({
  fields: {
    marginBottom: 30,
  },
  field: {
    width: 270,
    // borderWidth: 1,
    // marginBottom: -10
  }
})

export default SignForm
