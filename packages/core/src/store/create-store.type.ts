import type {Middleware} from 'redux'

export type IStoreOptions = {
  disableImmer?: boolean
  debug?: boolean
  middlewares?: Middleware[]
  ioRunner?: (actionReturn: any) => any
}
