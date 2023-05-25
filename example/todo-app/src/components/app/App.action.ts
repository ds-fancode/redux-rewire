import {createActionSlice} from 'redux-rewire'
import {AppReducer} from './App.reducer'

export const AppAction = createActionSlice(AppReducer, {})
