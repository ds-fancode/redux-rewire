import type {CreateReducerSliceType} from './create-reducer-slice-type'
import type {FCStore} from '../store/create-store'

export type CreateActionSliceType = <
  ReducerSlice extends ReturnType<CreateReducerSliceType> = any,
  ActionReturnType = void
>(
  reducerSlice: ReducerSlice,
  actionMap: Partial<{
    [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
      actionData: Parameters<
        ReturnType<ReducerSlice>['reducerActions'][key]
      >[0],
      props: {
        state: ReturnType<ReducerSlice>['initialState']
        actions: {
          [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
            actionData: Parameters<
              ReturnType<ReducerSlice>['reducerActions'][key]
            >[0]
          ) => ActionReturnType
        }
        rewireKey: string
        globalState: {[key: string]: any}
        prevState: ReturnType<ReducerSlice>['initialState']
      }
    ) => ActionReturnType
  }>,
  actionDefaultReturnValue?: ActionReturnType
) => ActionGetKeyType<ReducerSlice, ActionReturnType>

// intermediate separate function needed for type to work consistently
export type ActionGetKeyType<
  ReducerSlice extends ReturnType<CreateReducerSliceType>,
  ActionReturnType
> = (
  key: string,
  store: FCStore,
  actionsRef?: any,
  ioRunner?: (arg: ActionReturnType) => any,
  overrideInitialState?: Parameters<ReducerSlice>[3]
) => {
  key: string
  initialState: ReturnType<ReducerSlice>['initialState']
  getState: () => ReturnType<ReducerSlice>['initialState']
  actions: {
    [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
      actionData: Parameters<ReturnType<ReducerSlice>['reducerActions'][key]>[0]
    ) => ActionReturnType
  }
}
