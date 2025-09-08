import {IdentityKey} from '../core/create-initital-state'
import type {CreateInitialStateType} from '../core/create-initital-state.type'
import {keyHandler} from '../../helper/key-handler'

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
  parentInitialState: {[key: string]: any},
  globalState
) {
  const foundParentState = findClosesParentState(
    globalState,
    key,
    parentInitialState[IdentityKey]
  )
  if (foundParentState === null) {
    // eslint-disable-next-line no-console
    console.error(
      `[ParentNotFound]: make sure '${key}' is child of ${parentInitialState[IdentityKey]} and not a sibling!`
    )
  }
  return foundParentState
}
