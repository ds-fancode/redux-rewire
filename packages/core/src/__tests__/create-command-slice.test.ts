import {assert} from 'chai'
import {createActionSlice} from '../create-action-slice'
import {createInitialState} from '../create-initital-state'
import {createReducerSlice} from '../create-reducer-slice'

describe('createCommandSlice', () => {
  it('__tests__ single action', () => {
    const state = createInitialState('test', {
      collection: {loaded: false},
      test2: null,
    })
    const reducerSlice = createReducerSlice(state, {
      mount: (state, action) => state,
      response: (state, action) => {
        return {...state, response: action.response}
      },
    })
    const {asyncActions, actions} = createActionSlice(reducerSlice, {
      mount: (actionData, {state, actions, prevState}) => {
        return [
          {
            returnAction: actions.response,
            runIoAction: {
              type: '@@navigate',
              data: {
                componentId: '2',
                navigatorType: 'push',
                newScreen: 'HOME',
              },
            },
          },
        ]
      },
    })('test', {
      getState: () => ({test: {collection: 5}}),
      dispatch: (...arg: any) => {},
    } as any)

    const actionData = {collection: {id: 9}}
    const actual = asyncActions.mount(actionData)

    assert.deepEqual(actual, void 0)
  })
})
