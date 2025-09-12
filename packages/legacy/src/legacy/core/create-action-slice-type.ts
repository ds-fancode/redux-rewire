import type {
  ReducerGetKeyType,
  ReducerInputMap
} from './create-reducer-slice-type'
import type {FCStore} from '@ds-fancode/redux-rewire-core'

type IoReturnAction = any[]

export type ActionInputFunction<State, ActionType> = (
  state: State,
  actions: ActionType & {[key: string]: any},
  actionData: any,
  compKey: string,
  globalState: {[key: string]: any},
  prevState: State
) => IoReturnAction

export type ActionInputMap<State, ActionType> = {
  [key: string]: ActionInputFunction<State, ActionType>
}

export type ActionType<State, U extends ActionInputMap<State, any>> = {
  [key in keyof U]: (
    actionData: Parameters<U[key]>[2],
    newState?: State,
    prevState?: State
  ) => IoReturnAction
}

export type CreateActionSliceType = <
  State,
  T extends ReducerGetKeyType<State, ReducerInputMap<State>>,
  U extends ActionInputMap<
    ReturnType<T>['initialState'],
    ReturnType<T>['reducerActions'] &
      ReturnType<ActionGetKeyType<State, T, U>>['asyncActions']
  >
>(
  reducerSlice: T,
  actionMap: U
) => ActionGetKeyType<State, T, U>

// intermediate separate function needed for type to work consistently
export type ActionGetKeyType<
  State,
  T extends ReducerGetKeyType<State, ReducerInputMap<State>>,
  U extends ActionInputMap<
    ReturnType<T>['initialState'],
    ReturnType<T>['reducerActions'] & ActionType<State, U>
  >
> = (
  key: string,
  store?: FCStore,
  _?: any,
  actionsRef?: any,
  ioRunner?: Function,
  overrideInitialState?: any
) => {
  key: string
  initialState: ReturnType<T>['initialState']
  reducers: ReturnType<T>['reducers']
  reducerActions: ReturnType<T>['reducerActions']
  asyncActions: ActionType<ReturnType<T>['initialState'], U>
  actions: ReturnType<T>['reducerActions'] &
    ActionType<ReturnType<T>['initialState'], U>
}
