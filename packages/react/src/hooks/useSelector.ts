import {startTransition, useContext, useEffect, useMemo, useState} from 'react'
import {RewireContext} from '../core/Provider'

export const useRewireSelector = (
  key: string,
  selector: any,
  initialState: any,
  equalityFnOrOptions: any
) => {
  const {store} = useContext(RewireContext)
  const [slice, setSlice] = useState(() => {
    return {
      state: selector(store.getState()[key] ?? initialState),
      key
    }
  })

  useEffect(() => {
    let prevState = slice.state
    const unsub = store.subscribe(() => {
      const updatedGlobalState = store.getState()
      const nextState = selector(updatedGlobalState[key] ?? initialState)
      if (!equalityFnOrOptions(prevState, nextState)) {
        prevState = nextState
        startTransition(() => {
          setSlice({
            state: nextState,
            key
          })
        })
      }
    })
    return () => {
      unsub?.()
    }
  }, [key])

  const updatedState = useMemo(() => {
    if (slice.key === key) {
      return slice.state
    }
    return selector(store.getState()[key] ?? initialState)
  }, [key, slice])

  return updatedState
}
// Below is the implementation of useSyncExternalStore copied from react-redux , but this does not supports transitions
// export const useRewireSelector = (
//   key: string,
//   selector: any,
//   initialState: any,
//   equalityFnOrOptions: any
// ) => {
//   const {store} = useContext(RewireContext)
//   const state = useSyncExternalStore(
//     store.subscribe,
//     () => {
//       return selector(store.getState()[key] ?? initialState)
//     },
//     () => {
//       return selector(store.getState()[key] ?? initialState)
//     }
//   )

//   return state
// }
