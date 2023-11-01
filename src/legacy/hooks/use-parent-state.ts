import {shallowEqual, useSelector} from 'react-redux'
import {UseParentStateType} from './use-parent-state.type'

export const useParentState: UseParentStateType = function(parentKey: string) {
  return function(stateSelector = (_: any) => _, equalityFn = shallowEqual) {
    return useSelector(
      (state: any) => stateSelector(state[parentKey] ?? {}),
      equalityFn
    )
  }
}
