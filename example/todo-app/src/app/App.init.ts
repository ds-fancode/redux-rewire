import {createInitialState} from 'redux-rewire'

export interface IAppInitType {
  inputTodo: string
  loaded: boolean
}

export const AppInit = createInitialState<IAppInitType, boolean>('app', {
  inputTodo: '',
  loaded: false,
})
