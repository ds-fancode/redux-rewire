import {configureStore} from '@redux-rewire/core'
import {createLogger} from 'redux-logger'

const reduxLogger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
  timestamp: false
})
export const store = configureStore(
  [],
  {},
  {
    middlewares: [reduxLogger] as any
  }
)
