/*
* @flow
*/

'use strict'

import type {Action} from '../actions/types'
import {SampleValue} from '../actions/sample'

type State = SampleValue

const initialState = {}

function filter(state: State = initialState, action: Action): State {
 if (action.type === 'SAMPLE_ACTION') {
   return action.value
 }
 return state
}

export default filter
