import {configureStore} from '@ds-fancode/redux-rewire-core'
import {createLogger} from 'redux-logger'
import {settingStore} from './global-store/settings-store'

const reduxLogger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
  timestamp: false
})
export const store = configureStore(
  [settingStore],
  {},
  {
    middlewares: [reduxLogger] as any
  }
)
