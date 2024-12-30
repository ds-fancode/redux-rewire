import type {FCStore} from '../store/create-store'
import type {createActionSlice} from './create-action-slice'

export const createSlice = <
  ActionSliceReturnType extends ReturnType<typeof createActionSlice>,
  SliceState extends ReturnType<ActionSliceReturnType>['initialState']
>(
  key: string,
  actionSlice: ActionSliceReturnType,
  store: FCStore
): {
  subscribe: (cb: (state: SliceState) => void) => () => void
  getState: () => SliceState
  actions: ReturnType<ActionSliceReturnType>['actions']
} => {
  const {actions, initialState} = actionSlice(key, store)
  return {
    subscribe: cb => {
      return store.subscribe(() => {
        cb(store.getState()?.[key] ?? initialState)
      })
    },
    getState: () => {
      return store.getState()?.[key] ?? initialState
    },
    actions
  }
}
