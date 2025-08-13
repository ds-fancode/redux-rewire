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
}

export interface FCStore extends Store {
  reducerManager: {
    getReducerMap: any
    reduce: Reducer
    add: (key: string, reducer: Reducer) => void
    remove: (key: string) => void
  }
  ioRunner: (actionReturn: any) => any
  isImmerDisabled: () => boolean
  nameSpace: string
  addToQueue: (actionFunc: any) => void
}
