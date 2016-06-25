/*
* @flow
*/

'use strict'

import type {Action} from '../actions/types'

type State = {
  isLoggedIn: boolean;
};

const initialState = {
  isLoggedIn: false,
}

function user(state: State = initialState, action: Action): State {
  if (action.type === 'LOGGED_IN') {
    return {
      isLoggedIn: true,
    }
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState
  }
  return state
}

export default user
