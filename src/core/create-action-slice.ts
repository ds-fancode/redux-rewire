import {RESERVED_ACTIONS} from '../constant'
import {
  ActionGetKeyType,
  CreateActionSliceType,
} from './create-action-slice-type'
import {FCStore} from './create-store'
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

    if (store.getState()[key] !== undefined && result) {
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
      ...reducerActions,
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
      allAvailableActionKeys.forEach((actionKey) => {
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
    //#endregion
    result = {
      key,
      initialState,
      reducers,
      reducerActions,
      asyncActions,
      actions,
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
      const dispatch = store.getState() ?? {}
      const currentState = globalState[key] ?? newState ?? initialState

      let ioActions: any = undefined
      try {
        ioActions = actionMap[mapKey](data, {
          state: currentState,
          actions,
          key,
          globalState,
          prevState: prevState,
        })
        /**
         * Dispatching here only so that we can c apture logs in the crash middleware
         * This will not cause any performance aas we are not forwarding it ahead to redux
         */
        dispatch?.({
          type: `${RESERVED_ACTIONS.ASYNC_ACTION}/${key}/${mapKey}`,
          componentKey: key,
          asyncActionName: mapKey,
          ioActions,
        })
      } catch (e) {
        dispatch?.({
          type: RESERVED_ACTIONS.ASYNC_ACTION,
          componentKey: key,
          asyncActionName: mapKey,
          ioActions,
          error: e,
        })
      }
      return ioActions
    }
    return acc
  }, {})
}
