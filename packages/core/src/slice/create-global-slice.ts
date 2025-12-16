import type {FCStore} from '../types/base'
import type {createActionSlice} from './create-action-slice'

// type AnyFunction = (...args: any[]) => any
export const createGlobalSlice = <
  ActionSliceReturnType extends ReturnType<typeof createActionSlice>
>(
  key: string,
  actionSlice: ActionSliceReturnType
) => {
  if (!key) {
    throw new Error('Key is required to create a global slice')
  }
  return {
    overRideInitialState: <
      State extends ReturnType<ActionSliceReturnType>['initialState']
    >(
      store: FCStore,
      state: Partial<State>
    ) => {
      const nameSpacedKey = store.nameSpace ? `${store.nameSpace}/${key}` : key
      store.setPreLoadedState(nameSpacedKey, state)
    },
    init: <R extends ReturnType<ActionSliceReturnType>>(store: FCStore): R => {
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
