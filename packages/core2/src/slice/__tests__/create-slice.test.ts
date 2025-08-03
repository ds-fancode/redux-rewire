import {configureStore} from '../../store/create-store'
import {createSlice} from '../create-slice'
import type {FCStore} from '../../types/base'

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

    it('check subscription', done => {
      const {actions} = slice.addToStore(sliceKey, store)
      slice.on('count2', state => {
        expect(state.count).toBe(5)
        done()
      })
      actions.incrementCount(5)
    }, 100)

    it('check multiple subscription', done => {
      const {actions} = slice.addToStore(sliceKey, store)
      let callCount = 0
      const expectedCalls = 2
      slice.on('count2', state => {
        expect(state.count).toBe(5)
        callCount++
        if (callCount === expectedCalls) {
          done()
        }
      })

      slice.on('count2', state => {
        expect(state.count).toBe(5)
        callCount++
        if (callCount === expectedCalls) {
          done()
        }
      })
      actions.incrementCount(5)
    }, 100)
    it('check un-subscriptions', done => {
      const {actions, unsubscribe} = slice.addToStore(sliceKey, store)
      slice.on('count2', state => {
        done(new Error('subscriber should not be called after unsubscribe'))
      })
      unsubscribe()
      actions.incrementCount(5)
      done()
    }, 100)
  })

  describe('checking slice with name spaces', () => {
    const nameSpace = 'partner'
    let nameSpaceStore: FCStore = null!
    beforeEach(() => {
      nameSpaceStore = configureStore(
        {},
        {
          nameSpace
        }
      )
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

    it('check key return is namespaced', () => {
      const {key} = slice.addToStore(sliceKey, nameSpaceStore)
      expect(key).toBe(`${nameSpace}/sliceKey`)
    })
    it('check subscription', done => {
      const {actions} = slice.addToStore(sliceKey, nameSpaceStore)
      slice.on('count2', state => {
        expect(state.count).toBe(5)
        done()
      })
      actions.incrementCount(5)
    }, 100)
    it('check un subscriptions', done => {
      const {actions, unsubscribe} = slice.addToStore(sliceKey, nameSpaceStore)
      slice.on('count2', state => {
        done(new Error('subscriber should not be called after unsubscribe'))
      })
      unsubscribe()
      actions.incrementCount(5)
      done()
    }, 100)
  })
})
