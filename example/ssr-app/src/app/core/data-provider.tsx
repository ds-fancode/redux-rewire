import React, {createContext, useState} from 'react'

export class DataProviderClass {
  private promisesMap: {[key: string]: Promise<any>} = {}
  add(key: string, promise: Promise<any>) {
    console.log('DataProviderClass adding promise for key = ', key)
    this.promisesMap[key] = promise
  }
  get(key: string) {
    return this.promisesMap[key]
  }
  remove(key: string) {
    delete this.promisesMap[key]
  }
}

export const DataContext = createContext<DataProviderClass>(null as any)

const DataProviderView = (props: any) => {
  const [value] = useState(new DataProviderClass())
  console.log('DataProvider render')
  // @ts-ignore
  return <DataContext value={value}>{props.children}</DataContext>
}

export const DataProvider = React.memo(DataProviderView)
