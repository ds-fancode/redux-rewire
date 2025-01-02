import {createActionSlice} from '../create-action-slice'
import {createInitialState} from '../create-initital-state'
import {createReducerSlice} from '../create-reducer-slice'
import {configureStore, type FCStore} from '../../store/create-store'

describe('createCommandSlice', () => {
  let store: FCStore = null as any

  beforeEach(() => {
    store = configureStore([], {})
  })
  it('__tests__ single action', () => {
    const initialState = createInitialState({
      collection: {loaded: false},
      test2: null
    })
    enum TEST {
      A,
      B
    }
    const reducerSlice = createReducerSlice(initialState, {
      mount: (state, action: TEST) => state,
      emptyMount: state => state,
      response: (state, action: {a: number}) => {
        return state
      }
    })
    const actionSlice = createActionSlice(reducerSlice, {
      mount: (actionData, {state, actions, prevState}) => {
        console.log(state)
      },
      response: (actionData, {state, actions, prevState}) => {
        console.log(state)
      },
      response2: (actionData: TEST, {state, actions, prevState}) => {
        console.log(state)
      },
      emptyActions: (a: number) => {}
    })('test', store)
    actionSlice.actions.mount(TEST.A)
    actionSlice.actions.emptyMount()
    actionSlice.actions.emptyActions(2)
    actionSlice.actions.response({a: 1})
    actionSlice.actions.response2(TEST.A)

    // assert.deepEqual(actual, void 0)
  })
})
