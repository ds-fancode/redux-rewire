import type {FCStore} from '../store/create-store'
import {createActionsReference} from './create-actions-reference'
import {createReducerSlice} from './create-reducer-slice'

type ActionProps<State, AllActions> = {
  state: State
  actions: AllActions
  rewireKey: string
  prevState: State
}
export const createActionSlice = <
  ReducerSlice extends ReturnType<typeof createReducerSlice>,
  ReducerActions extends ReturnType<ReducerSlice>['reducerActions'],
  State extends ReturnType<ReducerSlice>['initialState'],
  ActionMap extends {
    [key in keyof ReducerActions]?: (
      actionData: key extends keyof ReducerActions
        ? Parameters<ReducerActions[key]>[0]
        : any,
      props: ActionProps<State, AllActions>
    ) => void
  } & {
    [key: string]: (
      actionData: any,
      props: ActionProps<State, AllActions>
    ) => void
  },
  AllActions extends {
    [key in
      | keyof ReducerActions
      | keyof ActionMap]: key extends keyof ReducerActions
      ? Parameters<ReducerActions[key]> extends [infer First, ...any[]]
        ? First extends undefined
          ? () => void
          : (data: First) => void
        : never
      : key extends keyof ActionMap
        ? ActionMap[key] extends (...args: any) => any
          ? Parameters<ActionMap[key]> extends [infer First, ...any[]]
            ? First extends undefined
              ? () => void
              : (data: First) => void
            : () => void
          : any
        : never
  }
>(
  reducerSlice: ReducerSlice,
  actionMap: ActionMap
) => {
  return (
    key: string,
    store: FCStore
  ): {
    key: string
    initialState: State
    actions: AllActions
  } => {
    if (!key) {
      throw new Error('Key is required to create a action slice')
    }
    if (!store?.dispatch || !store?.getState) {
      throw new Error(
        `store is not passed to createActionSlice for slice ${key}`
      )
    }
    const {getState} = store
    // All heavy-lifting is being done in this function to manage dependency of action and ioAction with each other, and for easy testing
    const {initialState, reducerActions, reducers} = reducerSlice(key, store)

    store.reducerManager.add(key, reducers)

    //#region create empty action
    const allAvailableActionKeys = Object.keys(actionMap).concat(
      Object.keys(reducerActions)
    )
    //#region map action to execute reducerSlice and ioAction
    const actions = createActionsReference(allAvailableActionKeys)
    // we already have mapped actionRef, we do not need to map action to execute reducerSlice and ioAction
    allAvailableActionKeys.forEach(actionKey => {
      actions[actionKey] = (data: any) => {
        const prevState = (getState?.() as any)[key] ?? initialState
        // before runIO started run our reducers to reducerSlice states
        if (reducerActions[actionKey]) reducerActions[actionKey]?.(data)
        // Async actions will get updated state after reducer work is done
        // first make async called to make sure we have current state to be used in async action
        const currentState = (getState?.() as any)[key] ?? initialState
        if (
          actionMap &&
          actionMap[actionKey] &&
          typeof actionMap[actionKey] === 'function'
        ) {
          actionMap[actionKey]!(data, {
            state: currentState,
            actions,
            rewireKey: key,
            prevState: prevState
          })
        }
      }
    })

    return {
      key,
      initialState: initialState as State,
      actions: actions
    }
  }
}
