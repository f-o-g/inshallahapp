'use strict'

import track from './track'

export default store => next => action => {
  track(action)
  return next(action)
}
