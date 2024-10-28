type IKeysSelector = <
  State extends {[key in string]: any},
  InputKeys extends keyof State
>(
  keys: InputKeys[]
) => (state: State) => {[Key in InputKeys]: State[Key]}

export const keysSelector: IKeysSelector = function (keys) {
  return state =>
    keys.reduce((acc, currentValue) => {
      acc[currentValue] = state[currentValue]
      return acc
    }, {} as any)
}
