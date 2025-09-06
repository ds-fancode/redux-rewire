import type {AnyAction, Reducer} from 'redux'
import {create} from 'mutative'
import type {FCStore} from '../types/base'

export type ReducerInputFunction<State> = (
  state: State,
  actionData: any, //never,
  props: {rewireKey: string; store: FCStore; globalState: any}
) => State

type UpdateInputType<State> = {
  [key: string]: (state: State, actionData: any) => State
}

export const createReducers = <State>(
  reducerKey: string,
  reducerMap: UpdateInputType<State>,
  initialState: State
): Reducer<State, AnyAction> => {
  return (state: State = initialState, action: AnyAction) => {
    const func = reducerMap[action.type]
    if (func && typeof func === 'function') {
      return func(state, action)
    }
    return state
  }
}

export const createReducerSlice = <
  State,
  ReducerObjType extends {
    [reducerKey: string]: ReducerInputFunction<State>
  }
>(
  initialState: State,
  reducers: ReducerObjType
) => {
  return <OverrideState extends State>(
    key: string,
    store: FCStore,
    overrideInitialState?: Partial<OverrideState>
  ): {
    key: string
    initialState: State
    reducerActions: {
      [key in keyof ReducerObjType]: (
        actionData: Parameters<ReducerObjType[key]>[1]
      ) => AnyAction
    }
  } => {
    if (!key) {
      throw new Error('Key is required to create a reducer slice')
    }
    if (!store?.dispatch || !store?.getState) {
      throw new Error(
        `store is not passed to createReducerSlice for slice ${key}`
      )
    }
    const {dispatch} = store
    const reducerKeys = Object.keys(reducers)
    const {updatedReducerMap, updatedReducerActionMap} = reducerKeys.reduce<{
      updatedReducerMap: {[key: string]: any}
      updatedReducerActionMap: {[key: string]: any}
    }>(
      (acc, reducerKey) => {
        if (
          reducers[reducerKey] &&
          typeof reducers[reducerKey] === 'function'
        ) {
          const combinedKey = `${key}/${reducerKey}`
          const {updatedReducerMap, updatedReducerActionMap} = acc
          updatedReducerMap[combinedKey] = (
            state: typeof initialState,
            action: AnyAction
          ) => {
            if (store.isImmerDisabled()) {
              // @ts-ignore
              return reducers[reducerKey]!(state, action.payload, {
                rewireKey: key,
                globalState: action.globalState,
                store
              })
            } else {
              return create(state, (draftState: any) => {
                // @ts-ignore
                return reducers[reducerKey]?.(draftState, action.payload, {
                  rewireKey: key,
                  globalState: action.globalState,
                  store
                })
              })
            }
          }

          updatedReducerActionMap[reducerKey] = (data: any) => {
            return dispatch({
              type: combinedKey,
              payload: data,
              globalState: store.getState()
            })
          }
        }
        return acc
      },
      {updatedReducerMap: {}, updatedReducerActionMap: {}}
    )
    const finalState: State = overrideInitialState
      ? {...initialState, ...overrideInitialState}
      : initialState

    const updatedReducers = createReducers(key, updatedReducerMap, finalState)
    store.reducerManager.add(key, updatedReducers)
    return {
      key,
      initialState: finalState,
      reducerActions: updatedReducerActionMap as any
    }
  }
}
