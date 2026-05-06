import {configureStore} from '../../store/create-store'
import {createActionSlice} from '../create-action-slice'
import {createGlobalSlice} from '../create-global-slice'
import {createReducerSlice} from '../create-reducer-slice'

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
      return state
    },
    decrementCount: async (actionData: number, {state, actions}) => {
      console.log(state)
      return state
    }
  })

  const globalSlice = createGlobalSlice(globalSliceKey1, globalActionSlice)
  describe('createGlobalSlice basic', () => {
    it('creating global store', async () => {
      const store = configureStore([], {})
      const globalSliceActive = globalSlice.init(store)
      expect(globalSliceActive.getState()).toEqual(
        globalSliceActive.initialState
      )
      const result = await globalSliceActive.actions.incrementCount(5)
      expect(result.state.count).toEqual(
        globalSliceActive.initialState.count + 5
      )
      expect(result.returnActions.count).toEqual(
        globalSliceActive.initialState.count + 5
      )
    })

    it('testing subscriber callback', async () => {
      const store = configureStore([], {})
      const globalSliceActive = globalSlice.init(store)
      expect(globalSliceActive.getState()).toEqual(
        globalSliceActive.initialState
      )
      await new Promise(resolve => {
        const unsubscribe = globalSliceActive.subscribe(state => {
          expect(state.count).toEqual(globalSliceActive.initialState.count + 5)
          unsubscribe()
          resolve(0)
        })
        globalSliceActive.actions.incrementCount(5)
      })
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

  describe('createGlobalSlice with name spaces', () => {
    it('creating global store', async () => {
      const store = configureStore([], {})
      const globalSliceActive = globalSlice.init(store)
      expect(globalSliceActive.getState()).toEqual(
        globalSliceActive.initialState
      )
      globalSliceActive.subscribe(state => {
        expect(state.count).toEqual(globalSliceActive.initialState.count + 5)
      })
      await globalSliceActive.actions.incrementCount(5)
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
    it('all slices should be tide to each store instance', async () => {
      const store = configureStore([])
      globalSlice.overRideInitialState(store, {count: 2})
      const globalSliceInit = globalSlice.init(store)
      const firstState = globalSliceInit.getState()
      expect(firstState.count).toEqual(2)
      const result = await globalSliceInit.actions.autoIncrementCount()
      expect(result.state.count).toEqual(firstState.count + 1)
    })
    it('all slices should be tide to each store instance', async () => {
      const store1 = configureStore([globalSlice])
      const store2 = configureStore([globalSlice])
      const globalSliceInit1 = globalSlice.init(store1)
      const globalSliceInit2 = globalSlice.init(store2)
      const result1 = await globalSliceInit1.actions.incrementCount(2)
      const result2 = await globalSliceInit2.actions.incrementCount(3)
      expect(globalSliceInit1.getState().count).toEqual(2)
      expect(result1.state.count).toEqual(2)
      expect(globalSliceInit2.getState().count).toEqual(3)
      expect(result2.state.count).toEqual(3)
    })
  })
})
