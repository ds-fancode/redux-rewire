import {createReducerSlice} from '../create-reducer-slice'
import {createActionSlice} from '../create-action-slice'
import {configureStore} from '../../store/create-store'
import {createGlobalSlice} from '../create-global-slice'

// @ts-ignore
const delay = (delay?: number) =>
  new Promise(resolve => setTimeout(resolve, delay ?? 10))

describe('createGlobalStore', () => {
  const initialState = {
    count: 0,
    countryCode: 'IN'
  }
  const globalSliceKey1 = 'sliceKey1'
  enum TEST {
    A,
    B
  }

  const globalReducerSlice = createReducerSlice(initialState, {
    incrementCount: (state, action: number) => {
      state.count = state.count + action
      return state
    },
    autoIncrementCount: state => {
      state.count = state.count + 1
      return state
    },
    decrementCount: state => {
      return state
    },
    response: (state, actionData: TEST) => {
      return state
    }
  })

  const globalActionSlice = createActionSlice(globalReducerSlice, {
    incrementCount: async (actionData, {state, actions}) => {
      actions.response(TEST.A)
    },
    decrementCount: (actionData: number, {state, actions}) => {
      console.log(state)
    }
  })

  const globalSlice = createGlobalSlice(globalSliceKey1, globalActionSlice)
  describe('createGlobalSlice basic', () => {
    it('creating global store', done => {
      const store = configureStore([], {})
      const globalSliceActive = globalSlice.init(store)
      expect(globalSliceActive.getState()).toEqual(
        globalSliceActive.initialState
      )
      globalSliceActive.subscribe(state => {
        expect(state.count).toEqual(globalSliceActive.initialState.count + 5)
        done()
      })
      globalSliceActive.actions.incrementCount(5)
      globalSliceActive.actions.decrementCount()
    })

    it('creating global store with server side state', () => {
      const serverState = {[globalSliceKey1]: {count: 5}}
      const customStore = configureStore([globalSlice], serverState)
      const globalSliceActive = globalSlice.init(customStore)
      expect(globalSliceActive.initialState.count).toEqual(5)
      expect(globalSliceActive.initialState.countryCode).toEqual('IN')
    })

    it('creating global store with server side state and overriding state', async () => {
      const serverState = {[globalSliceKey1]: {count: 5}}
      const globalSlice = createGlobalSlice(globalSliceKey1, globalActionSlice)
      const customStore = configureStore([globalSlice], serverState)
      ///
      globalSlice.overRideInitialState(customStore, {countryCode: 'BD'})
      const globalSliceInit = globalSlice.init(customStore)
      globalSliceInit.actions.autoIncrementCount()
      expect(globalSliceInit.initialState.count).toEqual(5)
      expect(globalSliceInit.initialState.countryCode).toEqual('BD')
    })
  })

  describe('createGlobalSlice parallel request on server', () => {
    const globalSlice = createGlobalSlice(globalSliceKey1, globalActionSlice)
    it('all slices should be tide to each store instance', done => {
      const store1 = configureStore([globalSlice])
      const globalSliceInit1 = globalSlice.init(store1)
      expect(globalSliceInit1.getState()).toEqual(initialState)
      globalSliceInit1.subscribe(state => {
        expect(state.count).toEqual(initialState.count + 1)
        done()
      })
      globalSliceInit1.actions.autoIncrementCount()
    })
    it('all slices should be tide to each store instance', done => {
      const store2 = configureStore([globalSlice])
      const globalSliceInit2 = globalSlice.init(store2)
      expect(globalSliceInit2.getState()).toEqual(initialState)
      globalSliceInit2.actions.autoIncrementCount()
      globalSliceInit2.subscribe(state => {
        expect(state.count).toEqual(initialState.count + 1)
        done()
      })
    })
  })
})
