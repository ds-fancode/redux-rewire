/* eslint-disable */
import {use, useId} from 'react'
import {DataContext} from '../core/data-provider'
import {useStore} from '@ds-fancode/redux-rewire-react'

// export const useSsrEffect = <
//   T extends {[key: string]: any} & {loaded: boolean}
// >(
//   key: string,
//   state: T,
//   callback: any,
//   shouldRenderOnServer = false,
//   deps?: any[]
// ) => {
//   if (shouldRenderOnServer) {
//     // eslint-disable-next-line react-hooks/rules-of-hooks,react-compiler/react-compiler
//     useDataSuspense(key, state, callback, undefined)
//   } else {
//     /**
//      * Only adding dependencies on the client side as ideally there
//      * should not be a need to render an effect on server side
//      */
//     // eslint-disable-next-line react-hooks/rules-of-hooks react-compiler/react-compiler
//     useEffect(() => {
//       if (typeof callback === 'function') {
//         callback()
//       }
//     }, deps ?? [])
//   }
//   return true
// }

export const useSsrEffect2 = <
  T extends {[key: string]: any} & {loaded: boolean}
>(
  key: string,
  state: T,
  callback: any
) => {
  const id = useId()
  const store = useStore()
  console.log('useSsrEffect2 render 1', key, id)
  let timeout: any
  if (!state.loaded) {
    const dataContext = use(DataContext)
    const existingPromise = dataContext.get(key)
    console.log('useSsrEffect2 existingPromise', key, existingPromise)
    if (!existingPromise) {
      const promiseObject = new Promise<void>((resolve, reject) => {
        console.log('useSsrEffect2 calling callback', key)
        callback()
        const unsub = store.subscribe(() => {
          const state = store.getState() as any
          console.log(
            'useSsrEffect2 store subscribe',
            key,
            state?.[key]?.loaded
          )
          if (state?.[key]?.loaded) {
            if (timeout) {
              clearTimeout(timeout)
            }
            resolve()
          }
        })
        timeout = setTimeout(() => {
          unsub?.()
          reject()
        }, 10000)
      })
      dataContext.add(id, promiseObject)
      use(promiseObject)
    }
    return existingPromise
  }
  console.log('useSsrEffect2 render 2', key, id)
  return null
}
