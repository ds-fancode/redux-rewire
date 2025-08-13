import {createReducerSlice} from '../create-reducer-slice'
import {createActionSlice} from '../create-action-slice'
import {configureStore} from '../../store/create-store'
import {createGlobalSlice} from '../create-global-slice'
import type {FCStore} from '../../types/base'

let store: FCStore = null as any

beforeEach(() => {
  store = configureStore([], {})
})
describe('createGlobalStore', () => {
  const initialState = {
    count: 0
  }
  const globalSliceKey1 = 'sliceKey1'
  enum TEST {
    A,
    B
  }
  const globalReducerSlice = createReducerSlice(initialState, {
    incrementCount: (state, action: TEST) => {
      state.count = state.count + 1
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

  const globalActionSlice = createActionSlice(globalReducerSlice, {
    incrementCount: async (actionData, {state, actions}) => {
      console.log(state)
      const res = 2
      actions.response(res)
    },
    decrementCount: (actionData, {state, actions}) => {
      console.log(state)
    }
  })

  it('creating global store', () => {
    const globalSlice = createGlobalSlice(globalSliceKey1, globalActionSlice)
    expect(globalSlice(store).getState()).toEqual(
      globalSlice(store).initialState
    )
    globalSlice(store).actions.incrementCount(TEST.A)
    expect(globalSlice(store).getState().count).toEqual(
      globalSlice(store).initialState.count + 1
    )
  })
})
