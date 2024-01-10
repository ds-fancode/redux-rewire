type IKeysRemover = <
  InputKeys extends keyof Obj,
  Obj extends {[key in string]: any}
>(
  keysToRemove: InputKeys[]
) => (state: Obj) => {[Key in Exclude<keyof Obj, InputKeys>]: Obj[Key]}

export const keysRemover: IKeysRemover = function (keysToRemove) {
  return (state) => {
    keysToRemove.forEach((key) => {
      delete state[key]
    })
    return state
  }
}
