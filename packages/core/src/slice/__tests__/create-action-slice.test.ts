import {createActionSlice} from '../create-action-slice'
import {createInitialState} from '../create-initital-state'
import {createReducerSlice} from '../create-reducer-slice'
import {configureStore, type FCStore} from '../../store/create-store'

describe('createCommandSlice', () => {
  let store: FCStore = null as any

  beforeEach(() => {
    store = configureStore({}, {})
  })
  it('__tests__ single action', () => {
    const initialState = createInitialState({
      collection: {loaded: false},
      test2: null
    })
    const reducerSlice = createReducerSlice(initialState, {
      mount: (state, action: number) => state,
      response: (state, action: string) => {
        return state
      }
    })
    const actionSlice = createActionSlice(reducerSlice, {
      mount: (actionData, {state, actions, prevState}) => {
        console.log(state)
      },
      // response: (actionData, {state, actions, prevState}) => {
      //   console.log(state)
      // },
      response2: (actionData: number, {state, actions, prevState}) => {
        console.log(state)
      }
    })('test', store)
    actionSlice.actions.mount(1)
    actionSlice.actions.response('test')
    actionSlice.actions.response2(3)

    // assert.deepEqual(actual, void 0)
  })
})
