import produce from 'immer'
import type {FCStore} from '../store/create-store'

import type {AnyAction, Reducer} from 'redux'

export type ReducerInputFunction<State> = (
  state: State,
  actionData: any,
  props: {reduxKey: string; globalState: Record<string, object>}
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
    } else {
      console.warn(
        `Reducers map should always return a function, check reducer map for ${reducerKey}`
      )
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
  return (
    key: string,
    store: FCStore
  ): {
    key: string
    initialState: State
    reducerActions: {
      [key in keyof ReducerObjType]: (
        actionData: Parameters<ReducerObjType[key]>[1]
      ) => AnyAction
    }
    reducers: Reducer<any, AnyAction>
  } => {
    if (!key) {
      throw new Error('Key is required to create a reducer slice')
    }
    if (!store?.dispatch || !store?.getState) {
      throw new Error(
        `store is not passed to createReducerSlice for slice ${key}`
      )
    }
    const {dispatch, getState} = store
    const reducerKeys = Object.keys(reducers)
    const {updatedReducerMap, updatedReducerActionMap} = reducerKeys.reduce<{
      updatedReducerMap: {[key: string]: any}
      updatedReducerActionMap: {[key: string]: any}
    }>(
      (acc, reducerKey) => {
        if (reducers[reducerKey]) {
          const combinedKey = `${key}/${reducerKey}`
          const {updatedReducerMap, updatedReducerActionMap} = acc
          updatedReducerMap[combinedKey] = produce(
            (draftState: typeof initialState, action: AnyAction) => {
              try {
                return reducers[reducerKey]?.(draftState, action.payload, {
                  reduxKey: key,
                  globalState: action.globalState
                })
              } catch (e) {
                console.error(`Error in updating reducer ${combinedKey}`, e)
              }
              return draftState
            }
          )
          updatedReducerActionMap[reducerKey] = (data: any) => {
            return dispatch({
              type: combinedKey,
              payload: data,
              globalState: getState?.() ?? {}
            })
          }
        }
        return acc
      },
      {updatedReducerMap: {}, updatedReducerActionMap: {}}
    )

    const updatedReducers = createReducers(key, updatedReducerMap, initialState)
    return {
      key,
      initialState,
      reducerActions: updatedReducerActionMap as any,
      reducers: updatedReducers
    }
  }
}
