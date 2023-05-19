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
        return {...state, collection: action.collection}
      },
      setUserData: (state, action) => {
        return state
      },
    })('test')
    const updatedState = reducers(
      undefined,
      reducerActions.loadCollections({collection: 10})
    )
    expect(updatedState).toEqual({
      ...state,
      collection: 10,
    })
  })
})
