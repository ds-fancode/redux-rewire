import type {CreateReducerSliceType} from './create-reducer-slice-type'
import type {FCStore} from '@ds-fancode/redux-rewire-core'

export type CreateActionSliceType<> = <
  ReducerSlice extends ReturnType<CreateReducerSliceType> = any,
  ActionReturnType extends
    ReturnType<ReducerSlice>['defaultActionReturnValue'] = void
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
        reduxKey: string
        reduxStore: {[key: string]: any}
        prevState: ReturnType<ReducerSlice>['initialState']
      }
    ) => Promise<ActionReturnType> | ActionReturnType
  }>,
  actionDefaultReturnValue?: ActionReturnType
) => ActionGetKeyType<
  ReducerSlice,
  Promise<ActionReturnType> | ActionReturnType
>

// intermediate separate function needed for type to work consistently
export type ActionGetKeyType<
  ReducerSlice extends ReturnType<CreateReducerSliceType>,
  ActionReturnType
> = (
  key: string,
  store?: FCStore,
  _?: any,
  actionsRef?: any,
  ioRunner?: (arg: ActionReturnType) => any,
  overrideInitialState?: Parameters<ReducerSlice>[3]
) => {
  key: string
  initialState: ReturnType<ReducerSlice>['initialState']
  reducers: ReturnType<ReducerSlice>['reducers']
  reducerActions: ReturnType<ReducerSlice>['reducerActions']
  asyncActions: {
    [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
      actionData: Parameters<ReturnType<ReducerSlice>['reducerActions'][key]>[0]
    ) => ActionReturnType
  }
  actions: {
    [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
      actionData: Parameters<ReturnType<ReducerSlice>['reducerActions'][key]>[0]
    ) => ActionReturnType
  }
}
