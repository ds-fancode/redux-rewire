import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  ReducersMapObject,
  Store,
} from 'redux'
import {IStoreOptions} from './create-store.type'

export interface FCStore extends Store {
  reducerManager: ReturnType<typeof createReducerManager>
  ioRunner: Function
}

function createReducerManager(initialReducers: ReducersMapObject) {
  // Create an object which maps keys to reducers
  // Adding appInit reducer to skip redux store initialize with incorect reducer warning
  const reducers: ReducersMapObject = {
    ...initialReducers,
    appInit: (state = true, action: any) => state,
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
        for (let key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action)
    },

    // Adds a new reducer with the specified key
    add: (key: string, reducer: Reducer, replace: boolean = false) => {
      if (!key) {
        return
      }
      /**
       * Adding support so that we can replace the reducer when needed (Do it for SSR for web)
       */
      if (!replace && reducers[key]) {
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
    },
  }
}

export function configureStore<S extends {[x: string]: any}>(
  initialReducer: ReducersMapObject,
  initialState: S,
  options: IStoreOptions
) {
  const {middlewares, ioRunner, debug} = options
  const enableDebugger = debug ?? process.env.NODE_ENV !== 'production'
  const reducerManager = createReducerManager(initialReducer)
  let middlewareList: any = []

  if (middlewares?.length) {
    middlewareList = middlewareList.concat(middlewares)
  }
  /**
   * Add dev to support for debugging in dev mode only
   */
  const composeEnhancers =
    enableDebugger &&
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
  if (typeof ioRunner === 'function') {
    store.ioRunner = ioRunner
  } else {
    // eslint-disable-next-line no-console
    console.warn('None Io runner has been register while creating store')
  }
  return store
}