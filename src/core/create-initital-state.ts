import {CreateInitialStateType} from './create-initital-state.type'

export const IdentityKey = '__IDENTITY__'

export const createInitialState: CreateInitialStateType = function (
  identityKey,
  initialState,
  defaultActionReturnValue
) {
  if (typeof initialState === 'object') {
    return {
      state: {
        ...initialState,
        [IdentityKey]: identityKey,
      },
      defaultActionReturnValue,
    }
  } else {
    return {
      state: initialState,
      defaultActionReturnValue,
    }
  }
}
