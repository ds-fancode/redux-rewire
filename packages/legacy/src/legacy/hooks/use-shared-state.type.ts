import type {
  ActionGetKeyType,
  ActionInputMap,
  ActionType
} from '../core/create-action-slice-type'
import type {
  ReducerGetKeyType,
  ReducerInputMap
} from '../core/create-reducer-slice-type'

export type UseReduxStateType = <
  State,
  T extends ReducerGetKeyType<State, ReducerInputMap<State>>,
  U extends ActionInputMap<
    ReturnType<T>['initialState'],
    ReturnType<T>['reducerActions'] & ActionType<State, U>
  >,
  ReturnState
>(
  compKey: string,
  actionSlice: {
    partialKey: string
    actionSlice: ActionGetKeyType<State, T, U>
    autoMount: boolean
    attachedComponentsCount: {[sharedKey: string]: number}
    actionsRefsKeyMap: {[sharedKey: string]: any}
  },
  stateSelector: (state: ReturnType<T>['initialState']) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => [
  string,
  ReturnState,
  ReturnType<T>['reducerActions'] & ActionType<ReturnType<T>['initialState'], U>
]
