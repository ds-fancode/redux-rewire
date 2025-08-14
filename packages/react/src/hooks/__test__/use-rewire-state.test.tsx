import {
  configureStore,
  createActionSlice,
  createInitialState,
  createReducerSlice,
  type FCStore
} from '@ds-fancode/redux-rewire-core'
import {useRewireState} from '../use-rewire-state'
import {RewireProvider} from '../../core/Provider'
import {act, renderHook} from '@testing-library/react'
import React from 'react'

let store: FCStore = null as any
beforeEach(() => {
  store = configureStore([], {})
})
describe('useRewireState', () => {
  // configure({reactStrictMode: true})
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
  const sliceKey = 'sliceKey2'

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
  const wrapper = ({children}: {children: any}) => (
    <RewireProvider store={store}>{children}</RewireProvider>
  )

  describe('test without initial state', () => {
    it('check default state and key', () => {
      const {result, rerender} = renderHook(
        () => useRewireState(sliceKey, actionSlice),
        {
          wrapper
        }
      )
      const [key, state, action] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual(initialState)

      const stateBeforeRender = result.current[1]
      rerender()
      expect(result.current[1]).toBe(stateBeforeRender)

      act(() => {
        action.autoIncrementCount()
      })
      expect(result.current[1]).toEqual({...initialState, count: 1})
    })
    it('check state with selector', () => {
      const {result, rerender} = renderHook(
        () =>
          useRewireState(sliceKey, actionSlice, state => ({
            count: state.count
          })),
        {
          wrapper
        }
      )
      const [key, state] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual({count: initialState.count})

      const stateBeforeRender = result.current[1]
      rerender()
      expect(result.current[1]).toBe(stateBeforeRender)
    })

    it('check state with custom equality check function', () => {
      const {result} = renderHook(
        () =>
          useRewireState(sliceKey, actionSlice, state => state, {
            equalityFunction: () => true
          }),
        {
          wrapper
        }
      )
      const [key, state, action] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual(initialState)
      const stateBeforeRender = result.current[1]
      act(() => {
        action.autoIncrementCount()
      })
      expect(result.current[1]).toBe(stateBeforeRender)
    })
  })

  describe('test with initial state', () => {
    it('check default state and key', () => {
      const {result} = renderHook(
        () =>
          useRewireState(sliceKey, actionSlice, state => state, {
            overrideInitialState: {count: 1}
          }),
        {
          wrapper
        }
      )
      const [key, state] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual({...initialState, count: 1})

      // const stateBeforeRender = result.current[1]
      // rerender()
      // expect(result.current[1]).toBe(stateBeforeRender)
      //
      // act(() => {
      //   action.autoIncrementCount()
      // })
      // expect(result.current[1]).toEqual({...initialState, count: 1})
    })
    it('check state with selector', () => {
      const {result, rerender} = renderHook(
        () =>
          useRewireState(sliceKey, actionSlice, state => ({
            count: state.count
          })),
        {
          wrapper
        }
      )
      const [key, state] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual({count: initialState.count})

      const stateBeforeRender = result.current[1]
      rerender()
      expect(result.current[1]).toBe(stateBeforeRender)
    })

    it('check state with custom equality check function', () => {
      const {result} = renderHook(
        () =>
          useRewireState(sliceKey, actionSlice, state => state, {
            equalityFunction: () => true
          }),
        {
          wrapper
        }
      )
      const [key, state, action] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual(initialState)
      const stateBeforeRender = result.current[1]
      act(() => {
        action.autoIncrementCount()
      })
      expect(result.current[1]).toBe(stateBeforeRender)
    })
  })
})
