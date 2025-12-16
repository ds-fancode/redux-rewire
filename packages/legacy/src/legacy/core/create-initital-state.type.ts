export type CreateInitialStateType = <State extends {[key: string]: any}>(
  identityKey: string,
  initialState: State
) => State & {__IDENTITY__: string}
