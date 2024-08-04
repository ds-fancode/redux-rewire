import {useMemo} from 'react'
import {shallowEqual} from 'react-redux'
import {UseGlobalStateType} from './use-global-state.type'
import {useRewireState} from './use-rewire-state'

export const useGlobalState: UseGlobalStateType = function (
  globalStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  // actionsRef undefined for first time, so that we get new actions from useRewireState
  const [key, state, actions] = useRewireState(
    globalStore.key,
    globalStore.actionSlice,
    stateSelector,
    equalityFn
  )
  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
