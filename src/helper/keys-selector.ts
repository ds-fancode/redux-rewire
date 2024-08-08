type IKeysSelector = <
  InputKeys extends keyof Obj,
  Obj extends {[key in string]: any}
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
export const keysSelector2 = <State>(state: State) => {
  return <InputKeys extends keyof State>(
    keys: InputKeys[]
  ): {[key in InputKeys]: State[key]} =>
    keys.reduce((acc, currentValue) => {
      acc[currentValue] = state[currentValue]
      return acc
    }, {} as any)
}

const state = {car: 10, bike: 20}
// const result = keysSelector(['cars'])(state)
const result2 = keysSelector2(state)(['car'])
