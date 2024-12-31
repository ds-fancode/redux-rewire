import type {Action, Reducer, ReducersMapObject, Store} from 'redux'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import type {IStoreOptions} from './create-store.type'
import {createGlobalSlice} from '../slice/create-global-slice'

export interface FCStore extends Store {
  reducerManager: ReturnType<typeof createReducerManager>
  ioRunner: (actionReturn: any) => any
  isImmerDisabled: () => boolean
}

function createReducerManager(options: IStoreOptions) {
  // Create an object which maps keys to reducers
  // Adding appInit reducer to skip redux store initialize with incorect reducer warning
  const {debug = false} = options
  const reducers: ReducersMapObject = {
    appInit: (state = true, action: any) => state,
    debug: (state = debug ?? false, action: any) => state
  }

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers)

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: Array<string> = []

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: any, action: Action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = {...state}
        for (const key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }
      // Delegate to the combined reducer
      if (action.hasOwnProperty('payload')) {
        // to handle action like '@@redux/INITk.w.i.7.y.8'
        return combinedReducer(state, action)
      }
      return state
    },

    // Adds a new reducer with the specified key
    add: (key: string, reducer: Reducer) => {
      if (!key) {
        return
      }
      /**
       * Adding support so that we can replace the reducer when needed (Do it for SSR for web)
       */
      if (reducers[key] && reducer.toString() === reducers[key]?.toString()) {
        return
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    },

    // Removes a reducer with the specified key
    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return
      }

      // Remove it from the reducer mapping
      delete reducers[key]

      // Add the key to the list of keys to clean up
      keysToRemove.push(key)

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    }
  }
}

export function configureStore<S extends {[x: string]: any}>(
  slices: Array<ReturnType<typeof createGlobalSlice>>,
  initialState: S,
  options: IStoreOptions = {}
) {
  const {middlewares, ioRunner, debug} = options || {}
  const reducerManager = createReducerManager(options)
  let middlewareList = middlewares ?? []
  /**
   * Add dev to support for debugging in dev mode only
   */
  const composeEnhancers =
    debug &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewareList)
    // other store enhancers if any
  )
  // Create a store with the root reducer function being the one exposed by the manager.
  const store: FCStore = createStore(
    reducerManager.reduce,
    initialState,
    enhancer
  )

  // Optional: Put the reducer manager on the store so it is easily accessible
  store.reducerManager = reducerManager
  store.isImmerDisabled = () => options?.disableImmer ?? false
  slices.forEach(slice => {
    slice(store)
  })
  if (typeof ioRunner === 'function') {
    store.ioRunner = ioRunner
  } else {
    // eslint-disable-next-line no-console
    console.warn('None Io runner has been register while creating store')
  }
  return store
}
