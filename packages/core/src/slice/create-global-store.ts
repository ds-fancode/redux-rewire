import type {FCStore} from '../store/create-store'
import type {createActionSlice} from './create-action-slice'
import {createSlice} from './create-slice'

export const createGlobalStore = <
  ActionSliceReturnType extends ReturnType<typeof createActionSlice>
>(
  key: string,
  actionSlice: ActionSliceReturnType,
  store: FCStore
) => {
  return {
    init: () => {
      createSlice(key, actionSlice, store)
    }
  }
}
