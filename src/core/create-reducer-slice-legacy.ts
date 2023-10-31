import produce from 'immer'
import {AnyAction} from 'redux'
import {RESERVED_ACTIONS} from '../constant'
import {createReducers} from './create-reducer'
import {CreateReducerSliceType} from './create-reducer-slice-legacy-type'

export const createReducerSliceLegacy: CreateReducerSliceType = function (
  {state: initialState, defaultActionReturnValue},
  reducers
) {
  return (key, dispatch, getState, overrideInitialState) => {
    const finalInitialState: typeof initialState = overrideInitialState
      ? JSON.parse(JSON.stringify(overrideInitialState)) // overrideInitialState is used in __tests__ cases
      : key && getState?.()?.[key]
      ? getState?.()?.[key]
      : initialState
    if (!key) {
      // return only references
      return {
        key,
        reducers,
        reducerActions: reducers,
        initialState: finalInitialState,
      } as any
    }
    const updatedReducerMap = Object.keys(reducers).reduce<{
      [key: string]: any
    }>((acc, reducerKey) => {
      if (reducers[reducerKey]) {
        const combinedKey = `${key}/${reducerKey}`
        acc[combinedKey] = produce(
          (draftState: typeof initialState, action: AnyAction) => {
            try {
              return reducers[reducerKey]?.(
                draftState,
                action.payload,
                key,
                action.globalState
              )
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
            return dispatch
              ? dispatch({
                  type: `${key}/${reducerKey}`,
                  payload: data,
                  globalState,
                })
              : {
                  type: `${key}/${reducerKey}`,
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
      defaultActionReturnValue,
    }
  }
}
