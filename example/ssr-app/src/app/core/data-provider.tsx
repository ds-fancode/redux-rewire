import React from 'react'

export class DataProviderClass {
  private promisesMap: {[key: string]: Promise<any>} = {}
  add(key: string, promise: Promise<any>) {
    this.promisesMap[key] = promise
  }
  get(key: string) {
    return this.promisesMap[key]
  }
}

export const DataContext = React.createContext<DataProviderClass>(null as any)

export const DataProvider = (props: any) => {
  const [value] = React.useState(new DataProviderClass())
  console.log('DataProvider render')
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  )
}
