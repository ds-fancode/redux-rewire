import {createInitialState} from '@redux-rewire/core'
import {SettingState, Theme} from './setting.type'

export const todoStoreInitialState = createInitialState<SettingState>({
  theme: Theme.LIGHT
})
