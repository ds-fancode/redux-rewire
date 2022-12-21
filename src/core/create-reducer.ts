import {AnyAction, Reducer} from 'redux'

type UpdateInputType<State> = {
  [key: string]: (state: State, actionData: any) => State
}

export const createReducers = <State>(
  reducerMap: UpdateInputType<State>,
  initialState: State
): Reducer<State, AnyAction> => {
  return (state: State = initialState, action: AnyAction) => {
    if (reducerMap[action.type]) {
      return reducerMap[action.type](state, action)
    }
    return state
  }
}
