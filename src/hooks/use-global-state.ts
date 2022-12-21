import {useMemo} from 'react'
import {shallowEqual} from 'react-redux'
import {UseReduxStateType} from './use-global-state.type'
import {useReduxState} from './use-redux-state'
export const useGlobalState: UseReduxStateType = function(
  globalStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const [key, state, actions] = useReduxState(
    globalStore.key,
    globalStore.actionSlice,
    stateSelector,
    equalityFn,
    globalStore.actionsRef
  )
  useMemo(() => {
    // global store mount action call
    if (!globalStore.isMounted) {
      globalStore.isMounted = true
      actions.mount?.(null)
    }
  }, [])
  return [key, state, actions]
}
