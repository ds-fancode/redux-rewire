import {settingStoreAction} from './setting-store.action'
import {store} from '../../store'

const todoStoreKey = '*todo-store'

export const settingStore = settingStoreAction(todoStoreKey, store)
