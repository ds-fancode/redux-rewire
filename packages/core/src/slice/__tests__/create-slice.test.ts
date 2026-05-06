import * as console from 'node:console'
import {configureStore} from '../../store/create-store'
import type {FCStore} from '../../types/base'
import {createActionSlice} from '../create-action-slice'
import {createReducerSlice} from '../create-reducer-slice'

const delay = (delay?: number) =>
  new Promise(resolve => setTimeout(resolve, delay ?? 10))
describe('checking slice', () => {
  describe('checking basic slice', () => {
    let store: FCStore = null as any
    beforeEach(() => {
      store = configureStore([], {})
    })
    const initialState = {
      count: 0,
      count2: 0
    }
    const sliceKey = 'sliceKey'
    enum TEST {
      A,
      B
    }
    const reducerSlice = createReducerSlice(initialState, {
      incrementCount: (state, action: number) => {
        state.count = action
        return state
      },
      autoIncrementCount: state => {
        state.count = state.count + 1
        return state
      },
      decrementCount: (state, actionData) => {
        return state
      },
      response: (state, actionData: TEST) => {
        return state
      },
      response2: state => {
        return state
      }
    })

    const actionSlice = createActionSlice(reducerSlice, {
      incrementCount: async (actionData, {state, store, actions}) => {
        actions.response(TEST.A)
        actions.decrementCount()
        return state
      },
      decrementCount: async (actionData: string, {state, actions}) => {
        return state
      },
      response: async (actionData, {state}) => {
        console.log(actionData === TEST.B)
        return state
      }
    })

    it('check state update', async () => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)
      const {returnActions, state} = await slice.actions.incrementCount(1)
      expect(state.count).toEqual(1)
      expect(returnActions.count).toEqual(1)
    })

    it('subscriber should be called if state is updated', async () => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)

      await new Promise(resolve => {
        const unsubscribe = slice.subscribe(state => {
          expect(state.count).toEqual(initialState.count + 1)
          unsubscribe()
          resolve(0)
        })
        slice.actions.incrementCount(1)
      })
    })

    it('subscriber should not be called if state is updated same primitive value', async () => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)
      const mockCallback = jest.fn()
      slice.subscribe(mockCallback)
      await slice.actions.incrementCount(0)
      expect(mockCallback).not.toHaveBeenCalled()
    })

    it('check un-subscriptions', async () => {
      const slice = actionSlice(sliceKey, store)
      const mockCallback = jest.fn()
      const unsub = slice.subscribe(mockCallback)
      unsub()
      await slice.actions.autoIncrementCount()
      expect(mockCallback).not.toHaveBeenCalled()
    })

    it('initial state should be updated', () => {
      const slice = actionSlice(sliceKey, store, {count: 2})
      expect(slice.getState()).toEqual({...initialState, count: 2})
    })

    it('check wif serverside state is present', () => {
      const serverState = {[sliceKey]: {count: 111}}
      const customStore = configureStore([], serverState)
      const slice = actionSlice(sliceKey, customStore)
      expect(slice.getState().count).toEqual(111)
    })
  })

  describe('checking slice with name spaces', () => {
    const nameSpace = 'partner'
    let nameSpaceStore: FCStore = null!
    beforeEach(() => {
      nameSpaceStore = configureStore(
        [],
        {},
        {
          nameSpace
        }
      )
    })
    const initialState = {
      count: 0,
      count2: 0
    }
    const sliceKey = 'sliceKey'

    const reducerSlice = createReducerSlice(initialState, {
      incrementCount: (state, action: number) => {
        state.count = action
        return state
      },
      autoIncrementCount: state => {
        state.count = state.count + 1
        return state
      },
      decrementCount: (state, actionData: string) => {
        return state
      },
      response: (state, actionData: number) => {
        return state
      }
    })

    const actionSlice = createActionSlice(reducerSlice, {
      incrementCount: async (actionData, {state, store, actions}) => {
        console.log(state)
        const res = 2
        actions.response(res)
        return state
      },
      decrementCount: async (actionData, {state, actions}) => {
        console.log(state)
        return state
      },
      response: async (actionData, {state}) => {
        return state
      }
    })

    it('check state update', async () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      expect(slice.getState()).toEqual(initialState)
      const result = await slice.actions.incrementCount(1)
      expect(result.state.count).toBe(initialState.count + 1)
      expect(slice.getState().count).toBe(initialState.count + 1)
    })
    it('check subscriptions', async () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      const mockCallback = jest.fn()
      slice.subscribe(mockCallback)
      await slice.actions.autoIncrementCount()
      expect(mockCallback).toHaveBeenCalled()
    })
    it('check un-subscriptions', async () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      const mockCallback = jest.fn()
      const unsub = slice.subscribe(mockCallback)
      unsub()
      await slice.actions.autoIncrementCount()
      expect(mockCallback).not.toHaveBeenCalled()
    })

    it('initial state should be updated', () => {
      const slice = actionSlice(sliceKey, nameSpaceStore, {count: 2})
      expect(slice.getState()).toEqual({...initialState, count: 2})
    })
    it('check wif serverside state is present', () => {
      const serverState = {[sliceKey]: {count: 111}}
      const customStore = configureStore([], serverState)
      const slice = actionSlice(sliceKey, customStore)
      expect(slice.getState().count).toEqual(111)
    })
  })
})
