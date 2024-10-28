import type {
  ActionGetKeyType,
  CreateActionSliceType
} from './create-action-slice-type'
import type {FCStore} from '../store/create-store'
import {createActionsReference} from './create-actions-reference'

export const createActionSlice: CreateActionSliceType = function (
  reducerSlice,
  actionMap
) {
  let result: ReturnType<ActionGetKeyType<typeof reducerSlice, any>> | null =
    null
  return function (
    key,
    store: FCStore,
    actionsRef,
    ioRunner,
    overrideInitialState
  ) {
    const {getState} = store

    if (result) {
      return result
    }
    // All heavy-lifting is being done in this function to manage dependency of action and ioAction with each other, and for easy testing
    const {initialState, reducerActions, reducers} = reducerSlice(
      key,
      store,
      overrideInitialState
    )

    store.reducerManager.add(key, reducers)

    //#region create empty action
    const allAvailableActionKeys = Object.keys({
      ...actionMap,
      ...reducerActions
    })
    if (!key) {
      // return only reference
      throw new Error('Key is required to create action slice')
    }

    const actions = createActionsReference(allAvailableActionKeys)
    const asyncActions = createAsyncFunction(
      key,
      store,
      initialState,
      actionMap,
      actions
    )
    //#endregion

    //#region map action to execute reducerSlice and ioAction
    if (!actionsRef) {
      // we already have mapped actionRef, we do not need to map action to execute reducerSlice and ioAction
      allAvailableActionKeys.forEach(actionKey => {
        actions[actionKey] = (
          data: any,
          inputNewState?: any,
          inputPrevState?: any
        ) => {
          const prevState =
            inputPrevState ?? (getState?.() as any)[key] ?? initialState
          // before runIO started run our reducers to reducerSlice states
          if (reducerActions[actionKey]) reducerActions[actionKey]?.(data)

          // Async actions will get updated state after reducer work is done
          // first make async called to make sure we have current state to be used in async action

          if (asyncActions[actionKey]) {
            const ioActions: any = asyncActions[actionKey](
              data,
              inputNewState,
              prevState
            )
            // execute IO
            if (typeof ioRunner === 'function') {
              ioRunner?.(ioActions)
            }
            return ioActions
          }
        }
      })
    }
    const getSliceState = () =>
      getState ? (getState()[key] ?? initialState) : initialState
    //#endregion
    result = {
      key,
      initialState,
      actions,
      getState: getSliceState
    }
    return result
  }
}

function createAsyncFunction(
  key: string,
  store: FCStore,
  initialState: any,
  actionMap: any,
  actions: any
) {
  return Object.keys(actionMap).reduce<any>((acc, mapKey) => {
    acc[mapKey] = (data: any = {}, newState?: any, prevState?: any) => {
      const globalState = store.getState() ?? {}
      const currentState = globalState[key] ?? newState ?? initialState

      let ioActions: any = undefined
      try {
        ioActions = actionMap[mapKey](data, {
          state: currentState,
          actions,
          key,
          globalState,
          prevState: prevState
        })
      } catch (e) {
        console.error('Error in updating reducer', key, mapKey, ioActions, e)
      }
      return ioActions
    }
    return acc
  }, {})
}
