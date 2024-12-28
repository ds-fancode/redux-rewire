import type {FCStore} from '../store/create-store'
import type {createActionSlice} from './create-action-slice'

export const createSlice = <
  ActionSliceReturnType extends ReturnType<typeof createActionSlice>
>(
  key: string,
  actionSlice: ActionSliceReturnType,
  store: FCStore
): {
  subscribe: (
    cb: (state: ReturnType<ActionSliceReturnType>['initialState']) => void
  ) => () => void
  getState: () => ReturnType<ActionSliceReturnType>['initialState']
  actions: ReturnType<ActionSliceReturnType>['actions']
} => {
  const {actions, initialState} = actionSlice(key, store)
  return {
    subscribe: cb => {
      const unSubscribe = store.subscribe(() => {
        cb(store.getState()?.[key] ?? initialState)
      })
      return unSubscribe
    },
    getState: () => {
      return store.getState()?.[key] ?? initialState
    },
    actions
  }
}
