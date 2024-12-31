import {createReducerSlice} from '../create-reducer-slice'
import {configureStore, type FCStore} from '../../store/create-store'
import {createActionSlice} from '../create-action-slice'

let store: FCStore = null as any
beforeEach(() => {
  store = configureStore([], {})
})
describe('checking slice', () => {
  const initialState = {
    count: 0
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
    incrementCount: async (actionData, {state, actions}) => {
      console.log(state)
      const res = 2
      actions.response(res)
    },
    decrementCount: (actionData, {state, actions}) => {
      console.log(state)
    }
  })

  it('check state update', () => {
    const slice = actionSlice(sliceKey, store)
    slice.actions.incrementCount(1)
    expect(slice.getState().count).toEqual(initialState.count + 1)
    slice.actions.autoIncrementCount()
    expect(slice.getState().count).toEqual(initialState.count + 2)
  })
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
})
