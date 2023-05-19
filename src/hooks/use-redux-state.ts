import {useMemo} from 'react'
import {useDispatch, useSelector, useStore} from 'react-redux'
import {FCStore} from '../core/create-store'
import {UseReduxStateType} from './use-redux-state.type'
import {keyHandler} from '../helper/key-handler'

export const useReduxState: UseReduxStateType = function (
  key,
  actionSlice,
  stateSelector = (_: any) => _,
  parentKey,
  equalityFn,
  actionsRef
) {
  const dispatch = useDispatch()
  const store = <FCStore>useStore()
  const finalKey = keyHandler.concat(parentKey, key)
  //#region create and return store
  const {initialState, actions} = useMemo(() => {
    // create once to make sure ref og actions do not change
    const {initialState, reducers, actions} = actionSlice(
      finalKey,
      dispatch,
      store.getState,
      actionsRef,
      store.ioRunner
    )
    // adding reducer to the store with replace
    store.reducerManager.add(key, reducers, true)
    return {initialState, reducers, actions}
  }, [key])
  const state = useSelector(
    (state: any) => stateSelector(state[key] ?? initialState),
    equalityFn
  )
  //#endregion

  return [key, state, actions]
}
