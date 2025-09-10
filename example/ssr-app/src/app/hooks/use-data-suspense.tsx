import {useContext} from 'react'
import {useStore} from '@ds-fancode/redux-rewire-react'
import {DataContext} from '../core/data-provider'

export const useDataSuspense: <
  T extends {
    [key: string]: any
    loaded: boolean
  }
>(
  key: string,
  state: T,
  callback?: any
) => void = (key, state, callback) => {
  const store = useStore()
  const dataContext = useContext(DataContext)
  // console.log('[useDataSuspense] render 1', state.loaded)
  let timeout: any
  let unsub: any
  if (!state.loaded) {
    let promiseObject = dataContext.get(key)
    // console.log('[useDataSuspense] promiseObject', key, promiseObject)
    if (!promiseObject) {
      promiseObject = new Promise<void>((resolve, reject) => {
        // console.log('[useDataSuspense] calling loader function', key)
        unsub = store.subscribe(() => {
          const state = store.getState() as any
          const isStateLoaded = !!state?.[key]?.loaded
          // console.log(
          //   '[useDataSuspense] store subscriber called',
          //   key,
          //   isStateLoaded
          // )
          if (isStateLoaded) {
            console.log('[useDataSuspense] resolving promise for', key)
            resolve()
          }
        })
        setTimeout(() => {
          callback?.()
        }, 0)
        timeout = setTimeout(() => {
          console.log('[useDataSuspense] timeout rejecting', key)
          reject('[useDataSuspense] timeout rejecting')
        }, 10000)
      })
        .then(() => {
          // console.log('[useDataSuspense] resolve', key)
        })
        .catch(() => {
          console.error('[useDataSuspense] reject', key)
        })
        .finally(() => {
          // console.log('[useDataSuspense] finally', key)
          dataContext.remove(key)
          unsub?.()
          if (timeout) {
            clearTimeout(timeout)
          }
        })
      dataContext.add(key, promiseObject)
    }
    console.log(`[useDataSuspense]-[suspending] with key ${key}`)
    throw promiseObject
  } else {
    // console.log('[useDataSuspense] state is already loaded', key)
  }
  return true
}
