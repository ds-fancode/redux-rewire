import type {createActionSlice} from './create-action-slice'
import type {FCStore} from '../types/base'

export const createGlobalSlice = <
  ActionSliceReturnType extends ReturnType<typeof createActionSlice>
>(
  key: string,
  actionSlice: ActionSliceReturnType
) => {
  if (!key) {
    throw new Error('Key is required to create a global slice')
  }
  return (store: FCStore): ReturnType<ActionSliceReturnType> => {
    if (!store.getState || !store.dispatch) {
      throw new Error('store is required to create a global slice')
    }
    return actionSlice(key, store) as any
  }
}
