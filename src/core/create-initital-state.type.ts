export type CreateInitialStateType = <State extends {[key: string]: any}>(
  identityKey: string,
  initialState: State
) => {
  state: State
}
