import type {AnyAction, Reducer} from 'redux'
import type {CreateInitialStateType} from './create-initital-state.type'
import type {FCStore} from '../store/create-store'

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
  store: FCStore,
  overrideInitialState?: ReturnType<CreateInitialStateType>
) => {
  key: string
  initialState: State
  reducers: Reducer<any, AnyAction>
  reducerActions: {
    [key in keyof ReducerObjType]: (
      actionData: Parameters<ReducerObjType[key]>[1],
      globalState?: Record<string, object>
    ) => AnyAction
  }
}

export type ReducerInputFunction<State> = (
  state: State,
  actionData: any,
  props: {reduxKey: string; globalState: Record<string, object>}
) => State
