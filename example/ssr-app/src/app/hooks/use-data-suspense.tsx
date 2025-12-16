import {useStore} from '@ds-fancode/redux-rewire-react'
import {use, useContext} from 'react'
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
  console.log('[useDataSuspense] render start', state.loaded)
  let timeout: any
  let unsub: any
  if (!state.loaded) {
    let promiseObject = dataContext.get(key)
    // console.log('[useDataSuspense] promiseObject', key, promiseObject)
    if (!promiseObject) {
      console.log('[useDataSuspense] creating promise >>', key)
      promiseObject = new Promise<void>((resolve, reject) => {
        unsub = store.subscribe(() => {
          const state = store.getState() as any
          const isStateLoaded = !!state?.[key]?.loaded
          if (isStateLoaded) {
            console.log('[useDataSuspense] resolving promise >>', key)
            resolve()
          }
        })
        callback?.()

        timeout = setTimeout(() => {
          console.log(
            '[useDataSuspense] rejecting due to timeout of 10 sec>> ',
            key
          )
          reject('rejecting')
        }, 10000)
      })
        .then(() => {
          console.log('[useDataSuspense] resolve >>', key)
        })
        .catch(() => {
          console.error('[useDataSuspense] catch >>', key)
        })
        .finally(() => {
          console.log('[useDataSuspense] finally >>', key)
          dataContext.remove(key)
          unsub?.()
          if (timeout) {
            clearTimeout(timeout)
          }
        })
      dataContext.add(key, promiseObject)
    }
    console.log(`[useDataSuspense] returning use >>`, key)
    return use(promiseObject)
  }
  console.log(`[useDataSuspense] returning true >>`, key)
  return true
}
