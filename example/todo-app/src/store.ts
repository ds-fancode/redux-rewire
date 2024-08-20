import {configureStore} from 'redux-rewire'
import {createLogger} from 'redux-logger'
const reduxLogger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
  timestamp: false,
})
export const appStore = configureStore(
  {},
  {},
  {
    middlewares: [reduxLogger] as any,
  }
)
