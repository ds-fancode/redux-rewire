import {createReducerSlice} from '../create-reducer-slice'
import {configureStore} from '../../store/create-store'
import type {FCStore} from '../../types/base'

let store: FCStore = null as any

beforeEach(() => {
  store = configureStore([], {})
})

describe('createUpdateSlice', () => {
  const state = {
    count: 0
  }
  const reducerSlice = createReducerSlice(state, {
    loadCollections: (state, action: number) => {
      state.count = action
      return state
    },
    setUserData: (state, action: string) => {
      return state
    }
  })
  const key = 'state-key'
  it('__tests__ single reducer', () => {
    const {reducerActions, initialState} = reducerSlice(key, store)
    reducerActions.loadCollections(1)
    console.log(initialState)
    expect(store.getState()?.[key]?.count).toEqual(1)
  })
})
