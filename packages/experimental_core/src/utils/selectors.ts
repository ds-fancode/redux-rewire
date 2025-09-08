export const identitySelector = <State>(state: State) => state

export const noneSelector = <State>(state: State) => true

export const keysSelector = <
  State extends {[key: string]: any},
  Input extends keyof State
>(
  keys: Array<Input>
) => {
  return (
    state: State
  ): {
    [K in Input]: K extends keyof State ? State[K] : unknown
  } => {
    return keys.reduce((acc, k) => {
      acc[k] = state[k]
      return acc
    }, {} as any)
  }
}
