import {useContext, useEffect, useMemo} from 'react'
import {shallowEqual} from 'react-redux'
import {keyHandler} from '../helper/key-handler'
import {useRewireState} from './use-rewire-state'
import {UseSharedStateType} from './use-shared-state.type'
import {RewireContext} from '../shared/provider'

function createSharedActionRefKey(key: string) {
  return keyHandler.concat(key, 'sharedActionRef')
}

function createSharedCompCountKey(key: string) {
  return keyHandler.concat(key, 'sharedCompCountRef')
}

export const useSharedState: UseSharedStateType = function (
  sharedKey,
  sharedStore,
  stateSelector = (_: any) => _,
  commonKey,
  equalityFn = shallowEqual
) {
  const finalKey = keyHandler.concat(sharedKey, sharedStore.partialKey)

  const actionRefKey = createSharedActionRefKey(finalKey)
  const sharedCompCountKey = createSharedCompCountKey(finalKey)

  const {globalStoreInitMap, setGlobalStoreInitMap} = useContext(RewireContext)

  const [key, state, actions] = useRewireState(
    finalKey,
    sharedStore.actionSlice,
    stateSelector,
    commonKey,
    equalityFn,
    globalStoreInitMap[actionRefKey]
  )
  useMemo(() => {
    if (globalStoreInitMap[actionRefKey] !== actions) {
      setGlobalStoreInitMap(actionRefKey, actions)
    }
  }, [actions])
  useMemo(() => {
    if (globalStoreInitMap[sharedCompCountKey] === undefined)
      setGlobalStoreInitMap(sharedCompCountKey, 0)

    // if count is resetted to zero then new mount call is needed
    if (globalStoreInitMap[sharedCompCountKey] === 0) {
      // shared store mount action call
      if (sharedStore.autoMount) actions.mount?.(null)
    }
    // increment on new component mount
    setGlobalStoreInitMap(
      sharedCompCountKey,
      globalStoreInitMap[sharedCompCountKey] + 1
    )
  }, [])
  useEffect(() => {
    return () => {
      if (globalStoreInitMap[sharedCompCountKey] !== undefined) {
        // decrement on component unmount
        setGlobalStoreInitMap(
          sharedCompCountKey,
          globalStoreInitMap[sharedCompCountKey] - 1
        )
        // if count is resetted to zero then new unmount call is needed
        if (globalStoreInitMap[sharedCompCountKey] === 0) {
          // shared store unmount action call
          if (sharedStore.autoMount) actions.unmount?.(null)
        }
      }
    }
  }, [])
  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
