import {keyHandler} from './key-handler'

export const sharedStoreSelector = function <T>(
  storeKey: string,
  compKey: string,
  globalState: any,
  defaultTo: T
): T {
  const rootKey = keyHandler.getUniqueRoot(compKey)
  const sharedKey = keyHandler.concat(rootKey, storeKey)
  return globalState[sharedKey] ?? defaultTo
}
