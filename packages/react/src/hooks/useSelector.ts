import {startTransition, useContext, useEffect, useState} from 'react'
import {RewireContext} from '../core/Provider'

export const useSelector2 = (selector: any, equalityFnOrOptions: any) => {
  const {store} = useContext(RewireContext)
  const [state, setState] = useState(selector(store.getState()))

  useEffect(() => {
    let prevState = state
    const unsub = store.subscribe(() => {
      const nextState = selector(store.getState())
      if (!equalityFnOrOptions(prevState, nextState)) {
        startTransition(() => {
          setState(nextState)
        })
      }
    })
    return () => {
      unsub?.()
    }
  }, [state])

  return state
}
