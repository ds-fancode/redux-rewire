import type {AnyAction, Dispatch, Reducer} from 'redux'
import type {CreateInitialStateType} from './create-initital-state.type'

type ReducerInputFunction<State> = (
  state: State,
  actionData: any,
  compKey: string,
  globalState: {[key: string]: any}
) => State | Omit<State, '__IDENTITY__'> // in-case we write a helper function for reducer this helps for no error

export type ReducerInputMap<State> = {
  [key: string]: ReducerInputFunction<State>
}

export type ReducerActionType<State, T extends ReducerInputMap<State>> = {
  [key in keyof T]: (
    actionData: Parameters<T[key]>[1],
    globalState?: any
  ) => AnyAction
}

export type CreateReducerSliceType = <
  State extends ReturnType<CreateInitialStateType>,
  ReducerObjType extends {
    [key: string]: ReducerInputFunction<State>
  }
>(
  initialState: State,
  reducerMap: ReducerObjType
) => ReducerGetKeyType<State, ReducerObjType>

// intermediate separate function needed for type to work consistently
export type ReducerGetKeyType<
  State,
  T extends {
    [key: string]: ReducerInputFunction<State>
  }
> = (
  key: string,
  dispatch?: Dispatch<AnyAction>,
  getState?: () => any,
  overrideInitialState?: any
) => {
  key: string
  initialState: State
  reducers: Reducer<any, AnyAction>
  reducerActions: ReducerActionType<State, T>
}
