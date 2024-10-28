import {CreateInitialStateType} from './create-initital-state.type'

export const IdentityKey = '__IDENTITY__'

export const createInitialState: CreateInitialStateType = function (
  identityKey,
  initialState
) {
  if (typeof initialState === 'object') {
    return {
      ...initialState,
      [IdentityKey]: identityKey
    }
  } else {
    return initialState
  }
}
