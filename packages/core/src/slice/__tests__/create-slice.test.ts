import {createReducerSlice} from '../create-reducer-slice'
import {configureStore, type FCStore} from '../../store/create-store'
import {createActionSlice} from '../create-action-slice'
import {createSlice} from '../create-slice'

let store: FCStore = null as any
beforeEach(() => {
  store = configureStore({}, {})
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
    decrementCount: (state, action: string) => {
      return state
    }
  })

  const actionSlice = createActionSlice(reducerSlice, {
    incrementCount: (actionData, {state, actions}) => {
      console.log(state)
    },
    decrementCount: (actionData, {state, actions}) => {
      console.log(state)
    }
  })

  it('check state update', () => {
    const slice = createSlice(sliceKey, actionSlice, store)
    slice.actions.incrementCount(1)
    expect(slice.getState().count).toEqual(initialState.count + 1)
  })
  it('check subscriptions', () => {
    const slice = createSlice(sliceKey, actionSlice, store)
    const unsubscribe = slice.subscribe(state => {
      console.log(state.count)
    })
    unsubscribe()
    expect(true).toBeTruthy()
  })
  it('check un-subscriptions', () => {
    const slice = createSlice(sliceKey, actionSlice, store)
    const unsubscribe = slice.subscribe(state => {
      console.log(state.count)
    })
    unsubscribe()
    expect(true).toBeTruthy()
  })
})
