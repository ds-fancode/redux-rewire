import {configureStore} from '../../store/create-store'
import {createSlice} from '../create-slice'
import type {FCStore} from '../../types/base'
import {RewireProvider, useRewire} from '../../react/use-rewire'
import React from 'react'
import {act, renderHook} from '@testing-library/react'

describe('checking slice', () => {
  describe('checking slice without name space', () => {
    let store: FCStore = null as any
    beforeEach(() => {
      store = configureStore([], {})
    })
    const initialState = {
      count: 0,
      count2: 0
    }
    const sliceKey = 'sliceKey'

    const slice = createSlice(initialState, {
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

    const wrapper = ({children}: {children: any}) => (
      <RewireProvider store={store}>{children}</RewireProvider>
    )

    it('check subscription', done => {
      const {result, rerender} = renderHook(() => useRewire(sliceKey, slice), {
        wrapper
      })
      const [key, state, actions] = result.current
      expect(key).toEqual(sliceKey)
      expect(state).toEqual(initialState)

      const stateBeforeRender = result.current[1]
      rerender()
      expect(result.current[1]).toBe(stateBeforeRender)

      act(() => {
        actions.autoIncrementCount()
        actions.incrementCount(5)
      })
      expect(result.current[1]).toEqual({...initialState, count: 1})
    }, 100)
  })
})
