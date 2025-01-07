import {
  configureStore,
  createActionSlice,
  createInitialState,
  createReducerSlice,
  type FCStore
} from '@redux-rewire/core'
import {useRewireState} from '../use-rewire-state'
import {RewireProvider} from '../../Provider'
import {render} from '@testing-library/react'
import React from 'react'

let store: FCStore = null as any
beforeEach(() => {
  store = configureStore([], {})
})
describe('useRewireState', () => {
  enum THEME {
    light,
    dark
  }
  type IState = {
    theme: THEME
    count: number
  }
  const initialState: IState = createInitialState<IState>({
    theme: THEME.dark,
    count: 0
  })
  const sliceKey = 'sliceKey'

  const reducerSlice = createReducerSlice(initialState, {
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

  const actionSlice = createActionSlice(reducerSlice, {
    incrementCount: async (actionData, {state, actions}) => {
      console.log(state)
      const res = 2
      actions.response(res)
    },
    decrementCount: (actionData, {state, actions}) => {
      console.log(state)
    }
  })

  const TestComponent: React.FC = () => {
    const [key, state, actions] = useRewireState(
      sliceKey,
      actionSlice,
      state => {
        return {theme: state.theme}
      },
      (a, b) => {
        return a.theme === b.theme
      }
    )
    return (
      <div key={key}>
        <span>{state.theme}</span>
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
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a Provider'
    )
  })
})
