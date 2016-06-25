/*
* @flow
*/

'use strict'

import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import promise from './promise'
import array from './array'
import analytics from './analytics'
import reducers from '../reducers'
import createLogger from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
})

const createInshaStore = applyMiddleware(
  thunk, promise, array, analytics, logger
)(createStore)

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createInshaStore)(reducers)
  persistStore(store, {storage: AsyncStorage}, onComplete)
  if (isDebuggingInChrome) {
    window.store = store
  }
  return store
}

export default configureStore
