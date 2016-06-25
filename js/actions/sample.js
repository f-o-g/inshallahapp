/*
* @flow
*/

'use strict'

import type {Action} from './types'

export type SampleValue = {
 [key: string]: boolean
}

function sampleAction(value: SampleValue): Action {
  return {
    type: 'SAMPLE_ACTION',
    value
  }
}

export default {
  sampleAction
}
