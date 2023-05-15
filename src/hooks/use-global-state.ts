import {useContext, useMemo, useState} from 'react'
import {shallowEqual} from 'react-redux'
import {UseReduxStateType} from './use-global-state.type'
import {useReduxState} from './use-redux-state'
import {RewireContext} from '../shared/provider'
import {ActionType} from '../core/create-action-slice-type'
export const useGlobalState: UseReduxStateType = function (
  globalStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const {globalStoreInitMap, setGlobalStoreInitMap} = useContext(RewireContext)

  // actionsRef undefined for first time, so that we get new actions from useReduxState
  const [actionsRef, setActionsRef] = useState<
    ActionType<any, any> | undefined
  >(globalStore.actionsRef)
  const [key, state, actions] = useReduxState(
    globalStore.key,
    globalStore.actionSlice,
    stateSelector,
    equalityFn,
    actionsRef
  )
  useMemo(() => {
    if (actionsRef !== actions) {
      // set this globalStore.actionsRef, so that globalState called from different comp, gets same actionsRef
      globalStore.actionsRef = actions
      setActionsRef(actions)
    }
  }, [actions])

  useMemo(() => {
    // global store mount action call
    if (globalStore.autoMount && !globalStoreInitMap[key]) {
      setGlobalStoreInitMap(key)
      actions.mount?.(null)
    }
  }, [])
  return [key, state, actions]
}
