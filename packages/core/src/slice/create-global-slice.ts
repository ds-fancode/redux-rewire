import type {FCStore} from '../types/base'
import type {createActionSlice} from './create-action-slice'

// type AnyFunction = (...args: any[]) => any
export const createGlobalSlice = <
  ActionSliceReturnType extends ReturnType<typeof createActionSlice>,
  State extends ReturnType<ActionSliceReturnType>['initialState']
>(
  key: string,
  actionSlice: ActionSliceReturnType
) => {
  if (!key) {
    throw new Error('Key is required to create a global slice')
  }
  let overrideInitialState: any = undefined
  return {
    overRideInitialState: (state: Partial<State>) => {
      if (state) {
        overrideInitialState = state
      }
    },
    init: (store: FCStore): ReturnType<ActionSliceReturnType> => {
      if (!store.getState || !store.dispatch) {
        throw new Error('store is required to create a global slice')
      }
      return actionSlice(key, store, overrideInitialState) as any
    }
  }
}
