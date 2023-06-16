import {Middleware} from 'redux'

export type IStoreOptions = {
  debug?: boolean
  middlewares?: Middleware[]
  ioRunner?: (actionReturn: any) => any
}
