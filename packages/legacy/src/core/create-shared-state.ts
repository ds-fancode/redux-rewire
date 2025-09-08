import type {CreateSharedStateType} from './create-shared-state.type'

export const createSharedState: CreateSharedStateType = function (
  partialKey,
  actionSlice,
  autoMount = true
) {
  return {
    partialKey,
    actionSlice,
    autoMount
  }
}
