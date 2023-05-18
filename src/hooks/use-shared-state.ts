import {useEffect, useMemo, useState} from 'react'
import {shallowEqual} from 'react-redux'
import {keyHandler} from '../helper/key-handler'
import {useReduxState} from './use-redux-state'
import {UseReduxStateType} from './use-shared-state.type'

export const useSharedState: UseReduxStateType = function(
  compKey,
  sharedStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const rootKey = keyHandler.getUniqueRoot(compKey)
  const finalKey = keyHandler.concat(rootKey, sharedStore.partialKey)
  const [actionsRef, setActionsRef] = useState(
    sharedStore.actionsRefsKeyMap[finalKey]
  )
  const [key, state, actions] = useReduxState(
    finalKey,
    sharedStore.actionSlice,
    stateSelector,
    equalityFn,
    actionsRef
  )
  useMemo(() => {
    if (sharedStore.actionsRefsKeyMap[finalKey] !== actions) {
      sharedStore.actionsRefsKeyMap[finalKey] = actions
      setActionsRef(actions)
    }
  }, [actions])

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
  return [key, state, actions]
}
