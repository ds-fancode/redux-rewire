import {useMemo} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UseGlobalStateType} from './use-global-state.type'

export const useGlobalState: UseGlobalStateType = function (
  globalStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  // actionsRef undefined for first time, so that we get new actions from useRewireState
  const state = useSelector(
    (state: any) =>
      stateSelector(state[globalStore.key] ?? globalStore.initialState),
    equalityFn
  )

  return useMemo(() => {
    return [globalStore.key, state, globalStore.actions]
  }, [globalStore.key, state, globalStore.actions])
}
