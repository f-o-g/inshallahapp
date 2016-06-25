/*
* @flow
*/

'use strict'

export type Action =
  {type: 'SAMPLE_ACTION', value: {[key: string]: boolean}}


  export type Dispatch =
    (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
  export type GetState = () => Object
  export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
  export type PromiseAction = Promise<Action>
