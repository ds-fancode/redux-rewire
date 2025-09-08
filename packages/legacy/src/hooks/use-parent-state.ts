import {shallowEqual, useSelector} from 'react-redux'
import {getParentState} from '../helper/get-parent-state'
import type {UseParentStateType} from './use-parent-state.type'

export const useParentState: UseParentStateType = function (
  key: string,
  parentInitialState,
  stateSelector,
  equalityFn = shallowEqual
) {
  return useSelector(
    (state: any) =>
      stateSelector(
        getParentState(key, parentInitialState, state) ?? parentInitialState
      ),
    equalityFn
  )
}
