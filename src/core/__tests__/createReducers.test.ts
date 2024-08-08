import {createReducers} from '../create-reducer-slice'

describe('createReducer', () => {
  describe('sync reducers', () => {
    it('__tests__ single reducer', () => {
      const state = {count: 0}
      const reducers = createReducers<typeof state>(
        {
          loadData: (state, action) => {
            return {...state, count: state.count + action.count}
          },
          userInput: (state, action) => {
            return state
          },
        },
        state
      )

      expect(reducers(state, {type: 'loadData', count: 2})).toEqual({
        count: 2,
      })
    })
  })
})
