import {
  configureStore,
  createActionSlice,
  createGlobalSlice,
  createReducerSlice,
  type FCStore
} from '@ds-fancode/redux-rewire-core'
import {RewireProvider} from '../../core/Provider'
import {render} from '@testing-library/react'
import React from 'react'
import {useGlobalState} from '../use-global-state'

let store: FCStore = null as any
beforeEach(() => {
  store = configureStore([], {})
})
describe('useRewireState', () => {
  enum TEST {
    A,
    B
  }
  const initialState: {count: number; country: TEST} = {
    count: 0,
    country: TEST.B
  }
  const reducerSlice = createReducerSlice(initialState, {
    incrementCount: (state, action: number, {globalState}) => {
      state.count = action
      return state
    },
    autoIncrementCount: state => {
      state.count = state.count + 1
      return state
    },
    decrementCount: (state, actionData: string, {store}) => {
      return state
    },
    response: (state, actionData: number, {store}) => {
      return state
    }
  })

  const actionSlice = createActionSlice(reducerSlice, {
    incrementCount: async (
      actionData,
      {state, actions, globalState, store}
    ) => {
      console.log(state)
      const res = 2
      actions.response(res)
    },
    decrementCount: (actionData, {state, actions}) => {
      console.log(state)
    }
  })
  const globalSlice = createGlobalSlice('global-key', actionSlice)

  const TestComponent: React.FC = () => {
    const [state, actions] = useGlobalState(globalSlice, state => {
      return state
    })
    const [country] = useGlobalState(globalSlice, state => {
      return state.country
    })
    return (
      <div>
        <span>{state.count}</span>
        <span>{country}</span>
        <button onClick={() => actions.autoIncrementCount()}>
          Change to Dark
        </button>
      </div>
    )
  }
  it('check state update', () => {
    render(
      <RewireProvider store={store}>
        <TestComponent />
      </RewireProvider>
    )
  })

  it('should throw an error if used outside of Provider', () => {
    expect(() => render(<TestComponent />)).toThrow()
  })
})
