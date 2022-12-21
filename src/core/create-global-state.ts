import {createActionsReferenceFromActionSlice} from './create-actions-reference'
import {CreateGlobalStateType} from './create-global-state.type'

export const createGlobalState: CreateGlobalStateType = function(
  key,
  actionSlice,
  autoMount = true
) {
  let isMounted = !autoMount // for global store(share by multiple molecules) we need way for auto mount
  let actionsRef = createActionsReferenceFromActionSlice(actionSlice)
  return {
    key,
    actionSlice,
    isMounted,
    actionsRef
  }
}
