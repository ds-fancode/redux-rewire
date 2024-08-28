import {useContext, useMemo, useState} from 'react'
import {shallowEqual} from 'react-redux'
import {ActionGetKeyType} from '../core/create-action-slice-type'
import {UseGlobalStateType} from './use-global-state.type'
import {useRewireState} from './use-rewire-state'
import {RewireContext} from '../shared/provider'
import {keyHandler} from '../helper/key-handler'

function createGlobalActionRefKey(key: string) {
  return keyHandler.concat(key, 'globalActionRef')
}

function createGlobalMountKey(key: string) {
  return keyHandler.concat(key, 'globalMountRef')
}

export const useGlobalState: UseGlobalStateType = function (
  globalStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const actionRefKey = createGlobalActionRefKey(globalStore.key)
  const mountRefKey = createGlobalMountKey(globalStore.key)

  const {globalStoreInitMap, setGlobalStoreInitMap} = useContext(RewireContext)

  // actionsRef undefined for first time, so that we get new actions from useRewireState
  const [actionsRef, setActionsRef] = useState<
    ReturnType<ActionGetKeyType<any, any>>['actions'] | undefined
  >(globalStoreInitMap[actionRefKey]) // undefined for first time

  const [key, state, actions] = useRewireState(
    globalStore.key,
    globalStore.actionSlice,
    stateSelector,
    undefined,
    equalityFn,
    actionsRef
  )
  useMemo(() => {
    if (actionsRef !== actions) {
      // set this globalStore.actionsRef, so that globalState called from different comp, gets same actionsRef
      setGlobalStoreInitMap(actionRefKey, actions)
      setActionsRef(actions)
    }
  }, [actions])
  useMemo(() => {
    // global store mount action call
    if (globalStore.autoMount && !globalStoreInitMap[mountRefKey]) {
      setGlobalStoreInitMap(mountRefKey, true)
      actions.mount?.(null)
    }
  }, [])
  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
