/* eslint-disable prefer-const */
import {CreateSharedStateType} from './create-shared-state.type'

export const createSharedState: CreateSharedStateType = function (
  key,
  actionSlice,
  autoMount = true
) {
  return {
    partialKey: key,
    actionSlice,
    autoMount,
  }
}
