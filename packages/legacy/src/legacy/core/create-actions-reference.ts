import type {ActionGetKeyType} from './create-action-slice-type'

export function createActionsReference(allKeys: string[]) {
  return allKeys.reduce((acc, actionKey) => {
    acc[actionKey] = (data: any = {}) => true // will rewrite this function after we have mapped reducers and ioAction
    return acc
  }, {} as any)
}

export function createActionsReferenceFromActionSlice(
  actionSlice: ActionGetKeyType<any, any, any>
) {
  // @ts-ignore
  const {reducers: reducerMap, asyncActions: actionMap} = actionSlice(undefined)

  const allAvailableActionKeys = [
    ...Object.keys(reducerMap),
    ...Object.keys(actionMap)
  ]
  return createActionsReference(allAvailableActionKeys)
}
