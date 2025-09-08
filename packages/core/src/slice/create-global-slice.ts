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
  return {
    overRideInitialState: (store: FCStore, state: Partial<State>) => {
      if (state && store) {
        const nameSpacedKey = store.nameSpace
          ? `${store.nameSpace}/${key}`
          : key
        store.setPreLoadedState(nameSpacedKey, state)
      } else if (store) {
        throw new Error(
          `You need to pass a store to overRideInitialState for ${key}`
        )
      }
    },
    init: (store: FCStore): ReturnType<ActionSliceReturnType> => {
      if (!store.getState || !store.dispatch) {
        throw new Error(
          `store is required to create a global slice, check ${key}`
        )
      }
      const nameSpacedKey = store.nameSpace ? `${store.nameSpace}/${key}` : key
      return actionSlice(
        key,
        store,
        store.getPreLoadedState(nameSpacedKey)
      ) as any
    }
  }
}
