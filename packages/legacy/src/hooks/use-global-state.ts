import {useContext, useMemo} from 'react'
import {shallowEqual} from 'react-redux'
import {UseReduxStateType} from './use-global-state.type'
import {useReduxState} from './use-redux-state'
import {RewireContext} from '../shared/provider'

export const useGlobalState: UseReduxStateType = function (
  globalStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const {globalStoreInitMap, setGlobalStoreInitMap} = useContext(RewireContext)
  const [key, state, actions] = useReduxState(
    globalStore.key,
    globalStore.actionSlice,
    stateSelector,
    equalityFn,
    globalStore.actionsRef
  )
  useMemo(() => {
    // global store mount action call
    if (globalStore.autoMount && !globalStoreInitMap[key]) {
      setGlobalStoreInitMap(key, true)
      actions.mount?.(null)
    }
  }, [])
  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
