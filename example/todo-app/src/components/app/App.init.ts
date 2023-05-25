import {createInitialState} from 'redux-rewire'

export interface IAppInitType {
  inputTodo: string,
}

export const AppInit = createInitialState<IAppInitType, Promise<boolean>>('app', {
  inputTodo: ''
})
