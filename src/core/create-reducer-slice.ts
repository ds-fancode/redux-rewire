import produce from 'immer'
import {RESERVED_ACTIONS} from '../constant'
import {CreateReducerSliceType} from './create-reducer-slice-type'
import {FCStore} from './create-store'

import {AnyAction, Reducer} from 'redux'

type UpdateInputType<State> = {
  [key: string]: (state: State, actionData: any) => State
}

export const createReducers = <State>(
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

export const createReducerSlice: CreateReducerSliceType = function (
  {state: initialState},
  reducers
) {
  return (key, store: FCStore, overrideInitialState) => {
    const {dispatch, getState} = store
    const finalInitialState: any = overrideInitialState
      ? JSON.parse(JSON.stringify(overrideInitialState)) // overrideInitialState is used in __tests__ cases
      : key && getState?.()?.[key]
      ? getState?.()?.[key]
      : initialState
    if (!key) {
      throw new Error('Key is required to create a reducer slice')
    }
    const updatedReducerMap = Object.keys(reducers).reduce<{
      [key: string]: any
    }>((acc, reducerKey) => {
      if (reducers[reducerKey]) {
        const combinedKey = `${key}/${reducerKey}`
        acc[combinedKey] = produce(
          (draftState: typeof initialState, action: AnyAction) => {
            try {
              return reducers[reducerKey]?.(draftState, action.payload, {
                reduxKey: key,
                globalState: action.globalState,
              })
            } catch (e) {
              console.error('Error in updating reducer', key, combinedKey, e)
              /**
               * Dispatching here only so that we can capture logs in the crash middleware, Need to delay this
               */
              setTimeout(() => {
                dispatch?.({
                  type: RESERVED_ACTIONS.REDUCER_ACTION,
                  componentKey: key,
                  asyncActionName: combinedKey,
                  error: e,
                })
              }, 0)
            }
            return draftState
          }
        )
      }
      return acc
    }, {})

    const updatedReducers = createReducers(updatedReducerMap, finalInitialState)

    const reducerKeys = Object.keys(reducers)

    const reducerActions: any = <{[key: string]: (data: any) => any}>(
      reducerKeys.reduce<any>((acc, reducerKey) => {
        if (reducers[reducerKey]) {
          acc[reducerKey] = (
            data: any,
            globalState: any = getState?.() ?? {}
          ) => {
            // directly dispatch the action
            const combinedKey = `${key}/${reducerKey}`
            return dispatch
              ? dispatch({
                  type: combinedKey,
                  payload: data,
                  globalState,
                })
              : {
                  type: combinedKey,
                  payload: data,
                  globalState,
                }
          }
        }
        return acc
      }, {})
    )

    return {
      key,
      initialState: finalInitialState,
      reducerActions,
      reducers: updatedReducers,
    }
  }
}
