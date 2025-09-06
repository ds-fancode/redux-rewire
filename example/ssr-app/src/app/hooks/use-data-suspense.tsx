// import {useCallback, useMemo, useRef} from 'react'
// import {useStore} from '@ds-fancode/redux-rewire-react'
//
// function ClientLogger(...args: any) {
//   // eslint-disable-next-line no-constant-condition
//   if (true) {
//     // eslint-disable-next-line no-console
//     console.log(...args)
//   }
// }
// const isPromise = (v: any) =>
//   typeof v === 'object' && typeof v.then === 'function'
// interface DataSuspenseOptions {
//   timeout?: number
//   debug?: boolean
// }
//
// const defaultOptions: Partial<DataSuspenseOptions> = {
//   timeout: 1500,
//   debug: false
// }
//
// /**
//  * Below function is only for logging purpose
//  * @param args
//  */
// export const useDataSuspense: <
//   T extends {
//     [key: string]: any
//     loaded: boolean
//   }
// >(
//   key: string,
//   state: T,
//   callback?: any,
//   checkIfLoaded?: (state: T, globalState: any) => boolean,
//   options?: DataSuspenseOptions
// ) => boolean | Promise<any> = (
//   key,
//   state,
//   callback,
//   checkIfLoaded,
//   options
// ) => {
//   const debugAlias = `[DATA-SUSPENSE-DEBUG]-[${key}]`
//   const store = useStore()
//   const {timeout} = {...defaultOptions, ...options}
//   const timeOutObject = useRef<any>(null)
//   const unsubRef = useRef<any>(null)
//   /**
//    * cleanup function
//    */
//   const clear = useCallback(() => {
//     ClientLogger(debugAlias, 'CLEAR')
//     timeOutObject?.current && clearTimeout(timeOutObject.current)
//     if (unsubRef?.current) {
//       unsubRef?.current()
//     }
//     timeOutObject.current = null
//     unsubRef.current = null
//   }, [])
//
//   const result = useMemo(() => {
//     let resolver: any = null
//     const globalState = store.getState()
//     const isLoaded =
//       typeof checkIfLoaded === 'function'
//         ? checkIfLoaded(state, globalState)
//         : state?.loaded
//     ClientLogger(debugAlias, 'useMemo called isLoaded =', isLoaded)
//     if (isLoaded) {
//       ClientLogger(debugAlias, 'Calling Clear', isLoaded)
//       /**
//        * try to unsubscribe the store and return if state is already loaded
//        */
//       clear()
//       return true
//     }
//     const promiseObj = new Promise(res => {
//       resolver = () => {
//         ClientLogger(debugAlias, 'Final promise has been RESOLVED')
//         res(true)
//       }
//     })
//     ClientLogger(debugAlias, 'subscribing to store')
//     const unsub = store.subscribe(() => {
//       /**
//        * Here we need to read the state from the main state ot get the updated data
//        */
//       const newState: any = store.getState()
//       const isLoaded =
//         checkIfLoaded && typeof checkIfLoaded === 'function'
//           ? checkIfLoaded(newState?.[key], newState)
//           : newState?.[key]?.loaded
//       ClientLogger(
//         debugAlias,
//         'store has been updated [clearing is success] isLoaded=',
//         isLoaded
//       )
//       if (isLoaded) {
//         /**
//          * try to unsubscribe the store here as well
//          */
//         unsub?.()
//         resolver?.()
//         clear()
//       }
//     })
//     unsubRef.current = unsub
//     /**
//      * run timeout
//      */
//     if (timeout) {
//       timeOutObject.current = setTimeout(() => {
//         ClientLogger(
//           debugAlias,
//           `[WARNING-PLEASE_CHECK]`,
//           'use data suspense has been timed out key=',
//           key
//         )
//         clear()
//         resolver?.()
//       }, timeout)
//     }
//     return promiseObj
//   }, [checkIfLoaded, clear, debugAlias, key, state, store, timeout])
//   useMemo(() => {
//     callback && typeof callback === 'function' && callback()
//   }, [callback])
//   if (isPromise(result)) {
//     throw result
//   }
//   return result
// }
