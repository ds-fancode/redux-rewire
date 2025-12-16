import type {CreateActionSliceType} from './create-action-slice-type'

export type CreateSharedStateType = <
  ActionSlice extends ReturnType<CreateActionSliceType>,
  State extends ReturnType<ActionSlice>['initialState'],
  ReturnState
>(
  partialKey: string,
  actionSlice: ActionSlice,
  autoMount?: boolean
) => {
  partialKey: string
  actionSlice: ActionSlice
  autoMount: boolean
}
