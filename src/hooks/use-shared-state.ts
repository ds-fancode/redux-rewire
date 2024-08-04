import {useMemo} from 'react'
import {shallowEqual} from 'react-redux'
import {keyHandler} from '../helper/key-handler'
import {useRewireState} from './use-rewire-state'
import {UseSharedStateType} from './use-shared-state.type'

export const useSharedState: UseSharedStateType = function (
  sharedKey,
  sharedStore,
  stateSelector = (_: any) => _,
  equalityFn = shallowEqual
) {
  const finalKey = keyHandler.concat(sharedKey, sharedStore.partialKey)

  const [key, state, actions] = useRewireState(
    finalKey,
    sharedStore.actionSlice,
    stateSelector,
    equalityFn
  )

  return useMemo(() => {
    return [key, state, actions]
  }, [key, state, actions])
}
