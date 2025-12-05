import type {FCStore} from '@ds-fancode/redux-rewire-core'
import {useMemo} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import type {UseReduxStateType} from './use-redux-state.type'

export const useReduxState: UseReduxStateType = function (
  key,
  actionSlice,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual,
  actionsRef
) {
  const store = <FCStore>useStore()
  //#region create and return store
  const {initialState, actions} = useMemo(() => {
    // create once to make sure ref og actions do not change
    const {initialState, reducers, actions} = actionSlice(
      key,
      store,
      store.getState,
      actionsRef,
      store.ioRunner
    )
    store.reducerManager.add(key, reducers)
    return {initialState, reducers, actions}
  }, [key])
  const state = useSelector(
    (state: any) => stateSelector(state[key] ?? initialState),
    equalityFn
  )
  //#endregion

  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
