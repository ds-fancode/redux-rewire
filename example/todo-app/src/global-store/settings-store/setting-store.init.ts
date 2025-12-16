import {createInitialState} from '@ds-fancode/redux-rewire-core'
import {SettingState, Theme} from './setting.type'

export const todoStoreInitialState = createInitialState<SettingState>({
  theme: Theme.LIGHT,
  count: 0
})
