import {createGlobalSlice} from '@redux-rewire/core'
import {settingStoreAction} from './setting-store.action'

export const settingStore = createGlobalSlice('setting', settingStoreAction)
