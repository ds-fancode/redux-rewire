type IKeysSelector = <
  Obj extends {[key in string]: any},
  InputKeys extends keyof Obj
>(
  keys: InputKeys[]
) => (state: Obj) => {[Key in InputKeys]: Obj[Key]}

export const keysSelector: IKeysSelector = function (keys) {
  return (state) =>
    keys.reduce((acc, currentValue) => {
      acc[currentValue] = state[currentValue]
      return acc
    }, {} as any)
}
