import type {Middleware, Reducer, Store} from 'redux'

export interface ActionFunction {
  [key: string]: any
}
export type IStoreOptions = {
  disableImmer?: boolean
  debug?: boolean
  middlewares?: Middleware[]
  ioRunner?: (actionReturn: any) => any
  nameSpace?: string
  reactNative?: boolean
  asyncFunction?: (cb: () => void) => void
}

export interface FCStore extends Store {
  reducerManager: {
    getReducerMap: any
    reduce: Reducer
    add: (key: string, reducer: Reducer) => void
    remove: (key: string) => void
    hasKey: (key: string) => boolean
  }
  ioRunner: (actionReturn: any) => any
  disableAutoImmutability: () => boolean
  nameSpace: string
  getServerSnapshot: () => Record<string, any>
  setPreLoadedState: (key: string, state: any) => void
  getPreLoadedState: (key: string) => Record<string, any>
  preLoadedState: (key: string, state: any) => void
  addToQueue: (actionFunc: any) => void
  reactNative: boolean
  asyncFunction: (cb: () => void) => void
}
