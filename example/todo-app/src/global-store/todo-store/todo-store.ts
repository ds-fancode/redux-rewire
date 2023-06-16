import {createGlobalState} from 'redux-rewire'
import {todoStoreAction} from './todo-store.action'

const todoStoreKey = '*todo-store'
export const todoStore = createGlobalState(todoStoreKey, todoStoreAction, true)
