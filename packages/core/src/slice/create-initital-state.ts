import type {CreateInitialStateType} from './create-initital-state.type'

export const IdentityKey = '__IDENTITY__'

export const createInitialState: CreateInitialStateType = function (
  identityKey,
  initialState
) {
  if (typeof initialState === 'object') {
    return {
      state: {
        ...initialState,
        [IdentityKey]: identityKey
      }
    }
  } else {
    return {
      state: initialState,
      [IdentityKey]: identityKey
    }
  }
}
