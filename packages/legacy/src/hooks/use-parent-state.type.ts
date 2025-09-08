import type {CreateInitialStateType} from '../core/create-initital-state.type'

export type UseParentStateType = <
  ParentState extends ReturnType<CreateInitialStateType>,
  ReturnState
>(
  key: string,
  parentInitialState: ParentState,
  stateSelector: (state: ParentState['state']) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => ReturnState
