import {createReducerSlice} from '../create-reducer-slice'
import {configureStore} from '../../store/create-store'
import {createActionSlice} from '../create-action-slice'
import type {FCStore} from '../../types/base'

describe('checking slice', () => {
  describe('checking slice without name space', () => {
    let store: FCStore = null as any
    beforeEach(() => {
      store = configureStore([], {})
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
      incrementCount: (actionData, {state, store, actions}) => {
        const res = 2
        actions.response(res)
        return 1
      },
      decrementCount: (actionData, {state, actions}) => {
        console.log(state)
        return Promise.resolve(null)
      },
      response2: (actionData: string) => {
        return {}
      }
    })

    it('check state update', done => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)
      slice.subscribe(state => {
        expect(state.count).toEqual(initialState.count + 1)
        done()
      })
      slice.actions.incrementCount(1)
    }, 2)

    it('callback should not be called if state is not updated', done => {
      const slice = actionSlice(sliceKey, store)
      expect(slice.getState()).toEqual(initialState)
      slice.subscribe(state => {
        done('should not be called')
      })
      slice.actions.incrementCount(0)
    }, 2000)

    it('check subscriptions', () => {
      const slice = actionSlice(sliceKey, store)
      const mockCallback = jest.fn()
      slice.subscribe(mockCallback)
      slice.actions.autoIncrementCount()
      const sliceState = slice.getState()
      expect(sliceState.count).toBe(1)
      expect(mockCallback).toHaveBeenCalledWith({...initialState, count: 1})
    })
    it('check un-subscriptions', () => {
      const slice = actionSlice(sliceKey, store)
      const mockCallback = jest.fn()
      const unsub = slice.subscribe(mockCallback)
      unsub()
      slice.actions.autoIncrementCount()
      const sliceState = slice.getState()
      expect(mockCallback).not.toHaveBeenCalled()
      expect(sliceState.count).toBe(1)
    })

    it('initial state should be updated', () => {
      const slice = actionSlice(sliceKey, store, {count: 2})
      expect(slice.getState()).toEqual({...initialState, count: 2})
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

    it('check state update', () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      expect(slice.key).toEqual(`${nameSpace}/${sliceKey}`)
      expect(slice.getState()).toEqual(initialState)
      slice.actions.incrementCount(1)
      expect(slice.getState().count).toEqual(initialState.count + 1)
      slice.actions.autoIncrementCount()
      expect(slice.getState().count).toEqual(initialState.count + 2)
    })
    it('check subscriptions', () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      const mockCallback = jest.fn()
      slice.subscribe(mockCallback)
      slice.actions.autoIncrementCount()
      const sliceState = slice.getState()
      expect(sliceState.count).toBe(1)
      expect(mockCallback).toHaveBeenCalledWith({...initialState, count: 1})
    })
    it('check un-subscriptions', () => {
      const slice = actionSlice(sliceKey, nameSpaceStore)
      const mockCallback = jest.fn()
      const unsub = slice.subscribe(mockCallback)
      unsub()
      slice.actions.autoIncrementCount()
      const sliceState = slice.getState()
      expect(mockCallback).not.toHaveBeenCalled()
      expect(sliceState.count).toBe(1)
    })

    it('initial state should be updated', () => {
      const slice = actionSlice(sliceKey, nameSpaceStore, {count: 2})
      expect(slice.getState()).toEqual({...initialState, count: 2})
    })
  })
})
