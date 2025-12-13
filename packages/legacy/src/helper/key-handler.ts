export const keyHandler = {
  separator: '/',
  componentIdMap: {} as {[key: string]: string | null | undefined},
  filterKeys(keys: any[], filterItems = [undefined, null]): string[] {
    return keys.filter(key => !filterItems.includes(key))
  },
  setComponentId(
    key: string | null | undefined,
    componentId: string | null | undefined
  ) {
    if (key) {
      const uniqueKey = this.getUniqueRoot(key)
      this.componentIdMap[uniqueKey] = componentId
    }
    return key
  },
  retrieveComponentId(key: string): string | null | undefined {
    if (key) {
      const uniqueKey = this.getUniqueRoot(key)
      if (this.componentIdMap[uniqueKey]) return this.componentIdMap[uniqueKey]
    }
    return null
  },
  createRootKey(
    key: string | null | undefined,
    uniqueString: string,
    componentId: string | null | undefined
  ) {
    const rootKey = this.concat(key, uniqueString)
    this.setComponentId(rootKey, componentId)
    return rootKey
  },
  concat(key: string | null | undefined, ...concatString: string[]) {
    const newKey = this.filterKeys(
      key ? [key, ...concatString] : concatString
    ).join(this.separator)
    if (key) {
      const componentId = this.retrieveComponentId(key)
      this.setComponentId(newKey, componentId)
    }
    return newKey
  },
  getParentKey(key: string, level = 1) {
    const splitKey = key.split(this.separator)
    for (let i = 0; i < level; i++) splitKey.pop()
    return splitKey.join(this.separator)
  },
  checkIfSameComponent(compKey: string, componentIdToCheck: string) {
    const componentId = this.retrieveComponentId(compKey)
    return componentId === componentIdToCheck
  },
  checkIfParent(childKey: string, parentKey: string) {
    return childKey.startsWith(parentKey)
  },
  checkIfSameParent(compKey1: string, compKey2: string) {
    const componentId1 = this.retrieveComponentId(compKey1)
    const componentId2 = this.retrieveComponentId(compKey2)
    return componentId1 && componentId2 && componentId1 === componentId2
  },
  getRoot(key: string) {
    const splitKey = key.split(this.separator)
    return splitKey.shift() ?? ''
  },
  getComponentId(key: string): string {
    const componentId = this.retrieveComponentId(key)
    if (componentId) return componentId
    const splitKey = key.split(this.separator)
    return splitKey.shift() ?? ''
  },
  getUniqueRoot(key: string) {
    const splitKey = key.split(this.separator)
    return splitKey.slice(0, 2).join(this.separator)
  },
  getAllParentKey(key: string) {
    const splitKey = key.split(this.separator)
    const result: string[] = []
    while (splitKey.length > 1) {
      splitKey.pop()
      result.push(splitKey.join(this.separator))
    }
    return result
  },
  findClosestParentValue<T>(
    parentsMap: {[parentKey: string]: T},
    compKey: string
  ): T | null {
    for (const eachParentKey in parentsMap) {
      if (keyHandler.checkIfParent(compKey, eachParentKey)) {
        return parentsMap[eachParentKey] ?? null
      }
    }
    return null
  }
}
