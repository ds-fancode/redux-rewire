import type {FCStore} from '../store/create-store'
import {createActionsReference} from './create-actions-reference'
import {createReducerSlice} from './create-reducer-slice'

type ActionArguments<
  Key,
  ReducerActions extends {[key: string]: any},
  State,
  AllActions
> = (
  actionData: Key extends keyof ReducerActions
    ? Parameters<ReducerActions[Key]>[0]
    : any,
  props: {
    state: State
    actions: AllActions
    rewireKey: string
    prevState: State
    store: FCStore
  }
) => void

export const createActionSlice = <
  ReducerSlice extends ReturnType<typeof createReducerSlice>,
  ReducerActions extends ReturnType<ReducerSlice>['reducerActions'],
  State extends ReturnType<ReducerSlice>['initialState'],
  ActionMap extends {
    [key in keyof ReducerActions]?: ActionArguments<
      key,
      ReducerActions,
      State,
      AllActions
    >
  } & {
    [key: string]: ActionArguments<any, ReducerActions, State, AllActions>
  },
  AllActions extends {
    [key in
      | keyof ReducerActions
      | keyof ActionMap]: key extends keyof ReducerActions
      ? ReducerActions[key] extends (...args: any[]) => any
        ? Parameters<ReducerActions[key]>[0] extends undefined
          ? () => void
          : (data: Parameters<ReducerActions[key]>[0]) => void
        : never
      : key extends keyof ActionMap
        ? ActionMap[key] extends (...args: any[]) => any
          ? Parameters<ActionMap[key]>[0] extends undefined
            ? () => void
            : (data: Parameters<ActionMap[key]>[0]) => void
          : never
        : never
  }
>(
  reducerSlice: ReducerSlice,
  actionMap: ActionMap
) => {
  // THIS LINE RUN ONLY ONCE
  return (
    key: string,
    store: FCStore
  ): {
    key: string
    initialState: State
    actions: AllActions
    subscribe: (cb: (state: State) => void) => () => void
    getState: () => State
  } => {
    // THIS LINE RUN MULTIPLE TIMES
    if (!key) {
      throw new Error('Key is required to create a action slice')
    }
    if (!store?.dispatch || !store?.getState) {
      throw new Error(
        `store is not passed to createActionSlice for slice ${key}`
      )
    }
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
        const prevState = (store.getState?.() as any)[key] ?? initialState
        // before runIO started run our reducers to reducerSlice states
        if (reducerActions[actionKey]) reducerActions[actionKey]?.(data)
        // Async actions will get updated state after reducer work is done
        // first make async called to make sure we have current state to be used in async action
        const currentState = (store.getState?.() as any)[key] ?? initialState
        if (
          actionMap &&
          actionMap[actionKey] &&
          typeof actionMap[actionKey] === 'function'
        ) {
          actionMap[actionKey]!(data, {
            state: currentState,
            actions,
            rewireKey: key,
            prevState: prevState,
            store
          })
        }
      }
    })

    return {
      key,
      initialState: initialState as State,
      actions: actions,
      subscribe: cb => {
        return store.subscribe(() => {
          cb(store.getState()?.[key] ?? initialState)
        })
      },
      getState: () => {
        return store.getState()?.[key] ?? initialState
      }
    }
  }
}
