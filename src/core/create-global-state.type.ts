import {CreateActionSliceType} from './create-action-slice-type'

export type CreateGlobalStateType = <
  ActionSlice extends ReturnType<CreateActionSliceType>,
  State extends ReturnType<ActionSlice>['initialState'],
  ReturnState
>(
  key: string,
  actionSlice: ActionSlice,
  autoMount?: boolean
) => {
  key: string
  actionSlice: ActionSlice
  autoMount: boolean
}

export type IReduxStore = {[key: string]: any}
