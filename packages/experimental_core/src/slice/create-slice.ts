import type {AnyAction} from 'redux'
import {create} from 'mutative'
import type {ActionFunction, FCStore} from '../types/base'

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
  const subscribers: any[] = [] as any
  let store: FCStore | null = null
  const getReducer = (sliceKey: string, updatedInitialState: State) => {
    const updatedReducerMap = Object.keys(reducerObj).reduce((acc, key) => {
      acc[`${sliceKey}/${key}`] = reducerObj[key]
      return acc
    }, {} as any)
    return (state: State = updatedInitialState, action: AnyAction) => {
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
    on: (
      cb: (state: State, actions: Actions, key: string) => void
    ): ActionFunction['returnType'] => {
      subscribers.push(cb)
      return () => {
        subscribers.splice(subscribers.indexOf(cb), 1)
      }
    },
    addToStore: (
      sliceKey: string,
      storeObj: FCStore,
      options?: {
        overrideInitialState?: Partial<State>
      }
    ) => {
      store = storeObj
      // add safe store check
      ///////////////////////////
      const updatedSliceKey = `${store?.nameSpace ? store?.nameSpace + '/' : ''}${sliceKey}`
      const updatedInitialState = {
        ...initialState,
        ...options?.overrideInitialState
      }
      const prevState = updatedInitialState
      const actions = getActions(updatedSliceKey) as Actions
      const reducer = getReducer(updatedSliceKey, updatedInitialState)

      store.reducerManager.add(updatedSliceKey, reducer)
      const unsubscribe = store.subscribe(() => {
        const updatedState = store?.getState()?.[updatedSliceKey]
        if (prevState !== updatedState) {
          // @ts-ignore
          subscribers.forEach(cb => cb(updatedState, actions, updatedSliceKey))
        }
      })
      return {
        initialState: updatedInitialState,
        key: updatedSliceKey,
        unsubscribe,
        actions: actions
      }
    }
  }
}
