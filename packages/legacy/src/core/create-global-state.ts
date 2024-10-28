import {createActionsReferenceFromActionSlice} from './create-actions-reference'
import {CreateGlobalStateType} from './create-global-state.type'

export const createGlobalState: CreateGlobalStateType = function (
  key,
  actionSlice,
  autoMount = true
) {
  const isMounted = !autoMount // for global store(share by multiple molecules) we need way for auto mount
  const actionsRef = createActionsReferenceFromActionSlice(actionSlice)
  return {
    key,
    actionSlice,
    autoMount,
    isMounted,
    actionsRef
  }
}
