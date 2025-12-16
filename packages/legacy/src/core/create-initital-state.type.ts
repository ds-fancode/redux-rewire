export type CreateInitialStateType = <
  State extends {[key: string]: any},
  ActionReturnType extends any | void = void
>(
  identityKey: string,
  initialState: State,
  defaultActionReturnValue?: ActionReturnType
) => {
  state: State
  defaultActionReturnValue?: ActionReturnType
}
