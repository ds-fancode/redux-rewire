import {useEffect, useMemo} from 'react'
import {shallowEqual} from 'react-redux'
import {createActionsReferenceFromActionSlice} from '../core/create-actions-reference'
import {keyHandler} from '../helper/key-handler'
import {useReduxState} from './use-redux-state'
import {UseReduxStateType} from './use-shared-state.type'

export const useSharedState: UseReduxStateType = function (
  compKey,
  sharedStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const rootKey = keyHandler.getUniqueRoot(compKey)
  const finalKey = keyHandler.concat(rootKey, sharedStore.partialKey)
  const actionsRef = useMemo(() => {
    // check if new actions Ref creation is required
    if (sharedStore.actionsRefsKeyMap[finalKey] === undefined) {
      // create new actionRef for first mount of specific screen shared store
      sharedStore.actionsRefsKeyMap[finalKey] =
        createActionsReferenceFromActionSlice(sharedStore.actionSlice)
    }
    return sharedStore.actionsRefsKeyMap[finalKey]
  }, [])
  const [key, state, actions] = useReduxState(
    finalKey,
    sharedStore.actionSlice,
    stateSelector,
    equalityFn,
    actionsRef
  )
  useMemo(() => {
    if (sharedStore.attachedComponentsCount[key] === undefined)
      sharedStore.attachedComponentsCount[key] = 0

    // if count is resetted to zero then new mount call is needed
    if (sharedStore.attachedComponentsCount[key] === 0) {
      // shared store mount action call
      if (sharedStore.autoMount) actions.mount?.(null)
    }
    // increment on new component mount
    sharedStore.attachedComponentsCount[key]++
  }, [])
  useEffect(() => {
    return () => {
      if (sharedStore.attachedComponentsCount[key] !== undefined) {
        // decrement on component unmount
        sharedStore.attachedComponentsCount[key]--
        // if count is resetted to zero then new unmount call is needed
        if (sharedStore.attachedComponentsCount[key] === 0) {
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
