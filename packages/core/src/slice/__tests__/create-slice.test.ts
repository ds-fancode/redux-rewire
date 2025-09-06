import {createReducerSlice} from '../create-reducer-slice'
import {configureStore} from '../../store/create-store'
import {createActionSlice} from '../create-action-slice'
import type {FCStore} from '../../types/base'

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
      decrementCount: (state, actionData, {globalState}) => {
        return state
      },
      response: (state, actionData: TEST) => {
        return state
      }
    })

    const actionSlice = createActionSlice(reducerSlice, {
      incrementCount: (actionData, {state, store, actions}) => {
        actions.response(TEST.A)
        return 1
      },
      decrementCount: (actionData, {state, actions}) => {
        return Promise.resolve(null)
      },
      response2: actionData => {
        console.log(actionData)
        return {}
      }
    })

    it('check state update', done => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)
      const unsubscribe = slice.subscribe(state => {
        expect(state.count).toEqual(initialState.count + 1)
        unsubscribe()
        done()
      })
      slice.actions.incrementCount(1)
    })

    it('callback should not be called if state is not updated', async () => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)
      const mockCallback = jest.fn()
      const unsubscribe = slice.subscribe(mockCallback)
      slice.actions.incrementCount(0)
      slice.actions.response2()
      await delay(50)
      expect(mockCallback).not.toHaveBeenCalled()
      unsubscribe()
      return true
    })

    it('check un-subscriptions', async () => {
      const slice = actionSlice(sliceKey, store)
      const mockCallback = jest.fn()
      const unsub = slice.subscribe(mockCallback)
      unsub()
      slice.actions.autoIncrementCount()
      await delay(50)
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
      },
      decrementCount: (actionData, {state, actions}) => {
        console.log(state)
      },
      response2: (actionData: string) => {
        return null
      }
    })

    it('check state update', done => {
      const slice = actionSlice(sliceKey, nameSpaceStore)

      expect(slice.getState()).toEqual(initialState)
      const unsubscribe = slice.subscribe(state => {
        expect(slice.key).toEqual(`${nameSpace}/${sliceKey}`)
        expect(state.count).toEqual(initialState.count + 1)
        unsubscribe()
        done()
      })
      slice.actions.incrementCount(1)

      expect(slice.getState()).toEqual(initialState)
      slice.actions.incrementCount(1)
    })
    it('check subscriptions', async () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      const mockCallback = jest.fn()
      slice.subscribe(mockCallback)
      slice.actions.autoIncrementCount()
      await delay(50)
      const sliceState = slice.getState()
      expect(sliceState.count).toBe(1)
      expect(mockCallback).toHaveBeenCalledWith({...initialState, count: 1})
    })
    it('check un-subscriptions', async () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      const mockCallback = jest.fn()
      const unsub = slice.subscribe(mockCallback)
      unsub()
      slice.actions.autoIncrementCount()
      await delay(50)
      const sliceState = slice.getState()
      expect(mockCallback).not.toHaveBeenCalled()
      expect(sliceState.count).toBe(1)
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
