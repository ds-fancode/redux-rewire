import {CreateGlobalStateType} from './create-global-state.type'

export const createGlobalState: CreateGlobalStateType = function (
  key,
  actionSlice,
  autoMount = true
) {
  let isMounted = !autoMount // for global store(share by multiple molecules) we need way for auto mount
  let actionsRef = undefined // this helps initialise a value which is going to reset in use-global-state
  return {
    key,
    actionSlice,
    autoMount,
    isMounted,
    actionsRef,
  }
}
