import {createInitialState} from 'redux-rewire'

export const initialState = createInitialState('todo-list-item-key', {
  list: [],
})
