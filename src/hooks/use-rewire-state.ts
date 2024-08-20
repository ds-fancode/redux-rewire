import {useMemo} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import {FCStore} from '../core/create-store'
import {UseRewireStateType} from './use-rewire-state.type'

export const useRewireState: UseRewireStateType = function (
  key,
  actionSlice,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const store = <FCStore>useStore()

  const {initialState, actions} = useMemo(() => {
    // create once to make sure ref og actions do not change
    const {initialState, actions} = actionSlice(key, store)
    // adding reducer to the store with replace
    return {initialState, actions}
  }, [key])

  const state = useSelector(
    (state: any) => stateSelector(state[key] ?? initialState),
    equalityFn
  )

  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
