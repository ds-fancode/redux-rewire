import {CreateSharedStateType} from './create-shared-state.type'

export const createSharedState: CreateSharedStateType = function (
  key,
  actionSlice,
  autoMount = true
) {
  // as per new shared key new count is needed
  const attachedComponentsCount = {} as {[sharedKey: string]: number}
  const actionsRefsKeyMap = {} as {[sharedKey: string]: any}
  return {
    partialKey: key,
    actionSlice,
    autoMount,
    attachedComponentsCount,
    actionsRefsKeyMap
  }
}
