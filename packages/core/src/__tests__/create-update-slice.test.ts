import {createInitialState} from '../create-initital-state'
import {createReducerSlice} from '../create-reducer-slice'

describe('createUpdateSlice', () => {
  it('__tests__ single reducer', () => {
    const state = createInitialState('test', {
      collection: {loaded: false},
      test2: null,
    })
    const {reducers, reducerActions} = createReducerSlice(state, {
      loadCollections: (state, action) => {
        state.collection = action.collection
        return state
      },
      setUserData: (state, action) => {
        return state
      },
    })('test', {
      getState: () => ({test: {collection: 5}}),
      dispatch: (...arg: any) => {},
    } as any)
    const updatedState = reducers(
      state,
      reducerActions.loadCollections({collection: 10})
    )
    expect(updatedState).toEqual({
      ...state,
      collection: 10,
    })
  })
})
