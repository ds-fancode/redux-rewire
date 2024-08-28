export function createActionsReference(allKeys: string[]) {
  return allKeys.reduce((acc, actionKey) => {
    acc[actionKey] = (data: any = {}) => true // will rewrite this function after we have mapped reducers and ioAction
    return acc
  }, {} as any)
}
