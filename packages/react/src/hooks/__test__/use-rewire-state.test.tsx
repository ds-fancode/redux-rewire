import {
  configureStore,
  createActionSlice,
  createInitialState,
  createReducerSlice
} from '@ds-fancode/redux-rewire-core'
import {act, renderHook, waitFor} from '@testing-library/react'
import React, {StrictMode} from 'react'
import {RewireProvider} from '../../core/Provider'
import {useRewireState} from '../use-rewire-state'

// @ts-ignore
const delay = (delay?: number) =>
  new Promise(resolve => setTimeout(resolve, delay ?? 10))

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
    incrementCount: (state, actionData: number) => {
      state.count = actionData
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
      const res = 2
      actions.response(res)
    },
    decrementCount: (actionData, {state, actions}) => {
      console.log(state)
    }
  })

  const wrapper = ({children}: {children: any}) => {
    const store = configureStore([], {})
    return (
      <StrictMode>
        <RewireProvider store={store}>{children}</RewireProvider>
      </StrictMode>
    )
  }

  describe('test without initial state', () => {
    it('check default state and key', async () => {
      const {result, rerender} = renderHook(
        () => {
          return useRewireState(sliceKey, actionSlice)
        },
        {
          wrapper
        }
      )
      expect(result.current[0]).toEqual(sliceKey)
      expect(result.current[1]).toEqual(initialState)

      const stateBeforeRender = {...result.current[1]}
      rerender()
      expect(result.current[1]).toEqual(stateBeforeRender)
      act(() => {
        result.current[2].autoIncrementCount()
      })
      rerender()
      // await delay(500)
      await waitFor(() => {
        expect(result.current[1].count).toBe(1)
        expect(result.current[1]).toEqual({...initialState, count: 1})
      })
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
  describe('test with slice key changed at runtime', () => {
    it('key changed with no intial state', () => {
      const key1 = 'key1'
      const {result} = renderHook(
        () => useRewireState(key1, actionSlice, state => state),
        {
          wrapper
        }
      )
      const [key, state] = result.current
      expect(key).toEqual(key1)
      expect(state).toEqual(initialState)
    })
  })
})
