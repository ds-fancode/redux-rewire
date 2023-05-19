import {shallowEqual, useSelector} from 'react-redux'
import {UseParentStateType} from './use-parent-state.type'
import {getParentState} from '../helper/get-parent-state'

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
