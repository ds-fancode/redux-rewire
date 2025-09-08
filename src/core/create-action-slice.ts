import {Dispatch} from 'redux'
import {RESERVED_ACTIONS} from '../constant'
import {CreateActionSliceType} from './create-action-slice-type'
import {createActionsReference} from './create-actions-reference'

export const createActionSlice: CreateActionSliceType = function (
  reducerSlice,
  actionMap
) {
  return function (
    key,
    dispatch,
    getState,
    actionsRef,
    ioRunner,
    overrideInitialState
  ) {
    // All heavy-lifting is being done in this function to manage dependency of action and ioAction with each other, and for easy testing
    const {initialState, reducerActions, reducers, defaultActionReturnValue} =
      reducerSlice(key, dispatch, getState, overrideInitialState)

    //#region create empty action
    const allAvailableActionKeys = [
      ...Object.keys(reducerActions),
      ...Object.keys(actionMap),
    ]

    const freshActionsRef = createActionsReference(allAvailableActionKeys)
    //#endregion

    const actions = actionsRef ?? freshActionsRef

    if (!key) {
      // return only reference
      return {
        key,
        initialState,
        reducerActions,
        reducers,
        asyncActions: actions,
        actions,
      }
    }

    //#region create asyncAction, passing empty actions
    // const runIoAdditionalProp = {componentId: keyHandler.getRoot(key) ?? ''} // TODO: should not do this manually, need to reducerSlice IO to avoid it accepting this argument
    const asyncActions = createAsyncFunction(
      key,
      initialState,
      actionMap,
      actions,
      getState,
      dispatch
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
              ioRunner?.(ioActions ?? defaultActionReturnValue)
            }
            return ioActions ?? defaultActionReturnValue
          }
          return defaultActionReturnValue
        }
      })
    }
    //#endregion

    return {
      key,
      initialState,
      reducers,
      reducerActions,
      asyncActions,
      actions,
    }
  }
}

function createAsyncFunction(
  key: string,
  initialState: any,
  actionMap: any,
  actions: any,
  getState?: () => {[key: string]: any},
  dispatch?: Dispatch
) {
  return Object.keys(actionMap).reduce<any>((acc, mapKey) => {
    acc[mapKey] = (data: any = {}, newState?: any, prevState?: any) => {
      const reduxStore = (getState && getState()) ?? {}
      const currentState = reduxStore[key] ?? newState ?? initialState

      let ioActions: any = undefined
      try {
        ioActions = actionMap[mapKey](data, {
          state: currentState,
          actions,
          reduxKey: key,
          reduxStore,
          prevState: prevState ?? initialState,
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
