import {createReducers} from './create-reducer'
import type {CreateReducerSliceType} from './create-reducer-slice-type'
import {create} from 'mutative'
import type {AnyAction} from 'redux'

export const createReducerSlice: CreateReducerSliceType = function (
  initialState,
  reducers
) {
  return (key, dispatch, getState, overrideInitialState) => {
    const finalInitialState: typeof initialState = overrideInitialState
      ? JSON.parse(JSON.stringify(overrideInitialState)) // overrideInitialState is used in __tests__ cases
      : key && getState?.()?.[key]
        ? getState?.()?.[key]
        : initialState
    const globalState = getState?.() ?? {}
    if (!key) {
      // return only references
      return {
        key,
        reducers,
        reducerActions: reducers,
        initialState: finalInitialState
      } as any
    }
    const updatedReducerMap = Object.keys(reducers).reduce<{
      [key: string]: any
    }>((acc, reducerKey) => {
      const combinedKey = `${key}/${reducerKey}`
      acc[combinedKey] = (state: typeof initialState, action: AnyAction) => {
        return create(state, (draftState: any) => {
          try {
            return reducers[reducerKey]?.(
              draftState,
              action.payload,
              key,
              action.globalState
            )
          } catch (error) {
            /**
             * Dispatching here only so that we can capture logs in the crash middleware, Need to delay this
             */
            if (globalState?.debug) {
              console.error('Error in updating reducer', {
                key,
                combinedKey,
                error
              })
            }
          }
          return draftState
        })
      }
      return acc
    }, {})

    const updatedReducers = createReducers(updatedReducerMap, finalInitialState)

    const reducerKeys = Object.keys(reducers)

    const reducerActions: any = <{[key: string]: (data: any) => any}>(
      reducerKeys.reduce<any>((acc, reducerKey) => {
        acc[reducerKey] = (
          data: any,
          globalState: any = getState?.() ?? {}
        ) => {
          // directly dispatch the action
          return dispatch
            ? dispatch({
                type: `${key}/${reducerKey}`,
                payload: data,
                globalState
              })
            : {
                type: `${key}/${reducerKey}`,
                payload: data,
                globalState
              }
        }
        return acc
      }, {})
    )

    return {
      key,
      initialState: finalInitialState,
      reducerActions,
      reducers: updatedReducers
    }
  }
}
