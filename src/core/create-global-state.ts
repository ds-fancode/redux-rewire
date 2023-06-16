/* eslint-disable prefer-const */
import {CreateGlobalStateType} from './create-global-state.type'

export const createGlobalState: CreateGlobalStateType = function (
  key,
  actionSlice,
  autoMount = true
) {
  return {
    key,
    actionSlice,
    autoMount,
  }
}
