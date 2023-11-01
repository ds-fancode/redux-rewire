export type UseParentStateType = <ParentState>(
  parentKey: string
) => <ReturnState>(
  stateSelector: (state: ParentState) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => ReturnState
