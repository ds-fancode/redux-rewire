import {createReducerSlice} from '../create-reducer-slice'
import {createActionSlice} from '../create-action-slice'
import {configureStore, type FCStore} from '../../store/create-store'
import {createGlobalSlice} from '../create-global-slice'

let store: FCStore = null as any

beforeEach(() => {
  store = configureStore([], {})
})
describe('createGlobalStore', () => {
  const initialState = {
    count: 0
  }
  const globalSliceKey1 = 'sliceKey1'

  const globalReducerSlice = createReducerSlice(initialState, {
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
    const globalSlice1 = createGlobalSlice(globalSliceKey1, globalActionSlice)
    expect(globalSlice1(store).getState()).toEqual(
      globalSlice1(store).initialState
    )
    globalSlice1(store).actions.incrementCount(1)
    expect(globalSlice1(store).getState().count).toEqual(
      globalSlice1(store).initialState.count + 1
    )
  })
})
