import {settingStoreAction} from './setting-store.action'
import {appStore} from '../../store'

const todoStoreKey = '*todo-store'

export const settingStore = settingStoreAction(todoStoreKey, appStore)
