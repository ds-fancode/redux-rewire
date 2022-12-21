import {
  ActionType,
  ActionGetKeyType,
  ActionInputMap
} from './create-action-slice-type'
import {ReducerGetKeyType, ReducerInputMap} from './create-reducer-slice-type'

export type CreateGlobalStateType = <
  State,
  T extends ReducerGetKeyType<State, ReducerInputMap<State>>,
  U extends ActionInputMap<
    ReturnType<T>['initialState'],
    ReturnType<T>['reducerActions'] & ActionType<State, U>
  >
>(
  key: string,
  actionSlice: ActionGetKeyType<State, T, U>,
  autoMount?: boolean
) => {
  key: string
  actionSlice: ActionGetKeyType<State, T, U>
  isMounted: boolean
  actionsRef: any
}
