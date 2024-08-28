import {AnyAction, Dispatch, Reducer} from 'redux'
import {IReduxStore} from './create-global-state.type'
import {CreateInitialStateType} from './create-initital-state.type'

export type CreateReducerSliceType = <
  InitialStateReturnType extends ReturnType<CreateInitialStateType>,
  State extends InitialStateReturnType['state'],
  ReducerObjType extends {
    [reducerKey: string]: ReducerInputFunction<InitialStateReturnType['state']>
  }
>(
  initialState: InitialStateReturnType,
  reducerMap: ReducerObjType
) => (
  key: string,
  dispatch?: Dispatch<AnyAction>,
  getState?: () => IReduxStore,
  overrideInitialState?: ReturnType<CreateInitialStateType>
) => {
  key: string
  initialState: State
  reducers: Reducer<any, AnyAction>
  reducerActions: {
    [key in keyof ReducerObjType]: (
      actionData: Parameters<ReducerObjType[key]>[1],
      globalState?: IReduxStore
    ) => AnyAction
  }
  defaultActionReturnValue: InitialStateReturnType['defaultActionReturnValue']
}

export type ReducerInputFunction<State> = (
  state: State,
  actionData: any,
  props: {reduxKey: string; reduxStore: IReduxStore}
) => State
