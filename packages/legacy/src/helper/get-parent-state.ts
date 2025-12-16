import {IdentityKey} from '../core/create-initital-state'
import type {CreateInitialStateType} from '../core/create-initital-state.type'
import {keyHandler} from './key-handler'

function findClosesParentState(
  globalState: {[key: string]: any},
  targetKey: string,
  identityKey: string
): any | null {
  if (globalState[targetKey]?.[IdentityKey] === identityKey) {
    return globalState[targetKey]
  } else {
    const immediateParentKey = keyHandler.getParentKey(targetKey, 1)
    if (immediateParentKey !== targetKey) {
      return findClosesParentState(globalState, immediateParentKey, identityKey)
    }
  }
  return null
}

type getParentStateType = <
  ParentState extends ReturnType<CreateInitialStateType>
>(
  key: string,
  parentInitialState: ParentState,
  globalState: {[key: string]: any}
) => ParentState

export const getParentState: getParentStateType = function (
  key: string,
  parentInitialState: ReturnType<CreateInitialStateType>,
  globalState
) {
  const foundParentState = findClosesParentState(
    globalState,
    key,
    parentInitialState.state[IdentityKey]
  )
  if (foundParentState === null) {
    console.error(
      `[ParentNotFound]: make sure '${key}' is child of ${parentInitialState.state[IdentityKey]} and not a sibling!`
    )
  }
  return foundParentState
}
