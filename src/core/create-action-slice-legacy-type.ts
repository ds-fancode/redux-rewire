import {AnyAction, Dispatch} from 'redux'
import {IReduxStore} from './create-global-state.type'
import {CreateReducerSliceType} from './create-reducer-slice-type'

export type CreateActionSliceType<> = <
  ReducerSlice extends ReturnType<CreateReducerSliceType> = any,
  ActionReturnType extends ReturnType<ReducerSlice>['defaultActionReturnValue'] = void
>(
  reducerSlice: ReducerSlice,
  actionMap: Partial<{
    [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
      actionData: Parameters<
        ReturnType<ReducerSlice>['reducerActions'][key]
      >[0],
      state: ReturnType<ReducerSlice>['initialState'],
      actions: {
        [key in keyof ReturnType<ReducerSlice>['reducerActions']]: (
          actionData: Parameters<
            ReturnType<ReducerSlice>['reducerActions'][key]
          >[0]
        ) => ActionReturnType
      },
      reduxKey: string,
      reduxStore: {[key: string]: any},
      prevState: Parameters<ReducerSlice>[0]
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
  dispatch?: Dispatch<AnyAction>,
  getState?: () => IReduxStore,
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
