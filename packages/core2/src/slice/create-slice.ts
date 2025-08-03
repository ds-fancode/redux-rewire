import type {AnyAction} from 'redux'
import {create} from 'mutative'
import type {FCStore} from '../types/base'

export const createSlice = <
  State,
  ReducerObj extends {
    [key: string]: (state: State, actionData: any) => State
  },
  Actions extends {
    [Key in keyof ReducerObj]: Parameters<ReducerObj[Key]>[1] extends undefined
      ? () => void
      : (data: Parameters<ReducerObj[Key]>[1]) => void
  }
>(
  initialState: State,
  reducerObj: ReducerObj
) => {
  const subscribers: Record<keyof State, any[]> = {} as any
  let store: FCStore | null = null
  const getReducer = (sliceKey: string) => {
    const updatedReducerMap = Object.keys(reducerObj).reduce((acc, key) => {
      acc[`${sliceKey}/${key}`] = reducerObj[key]
      return acc
    }, {} as any)
    return (state: State = initialState, action: AnyAction) => {
      const func = updatedReducerMap[action.type]
      if (func && typeof func === 'function') {
        return create(state, draft => {
          func(draft, action.payload)
        })
      }
      return state
    }
  }
  const getActions: any = (sliceKey: string) => {
    return Object.keys(reducerObj).reduce((acc, key) => {
      acc[key] = (data: any) => {
        if (!store) {
          throw new Error(
            `Error while trying to fire an slice action before attaching slice to the store`
          )
        }
        store?.dispatch?.({
          type: `${sliceKey}/${key}`,
          payload: data
        })
      }
      return acc
    }, {} as any)
  }

  return {
    initialState: initialState,
    on: (stateKey: keyof State, cb: (state: State) => void) => {
      if (subscribers[stateKey]?.length) {
        subscribers[stateKey].push(cb)
      } else {
        subscribers[stateKey] = [cb]
      }
    },
    addToStore: (sliceKey: string, storeObj: FCStore) => {
      store = storeObj
      // add safe store check
      ///////////////////////////
      const updatedSliceKey = `${store?.nameSpace ? store?.nameSpace + '/' : ''}${sliceKey}`
      const prevState = initialState

      store.reducerManager.add(updatedSliceKey, getReducer(updatedSliceKey))
      const unsubscribe = store.subscribe(() => {
        const updatedState = store?.getState()?.[updatedSliceKey]
        if (prevState !== updatedState) {
          Object.keys(subscribers).forEach(key => {
            // @ts-ignore
            subscribers[key]?.forEach?.(cb => cb(updatedState))
          })
        }
      })
      return {
        key: updatedSliceKey,
        unsubscribe,
        actions: getActions(updatedSliceKey) as Actions
      }
    }
  }
}
