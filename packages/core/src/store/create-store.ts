import type {Action, Reducer, ReducersMapObject} from 'redux'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {createGlobalSlice} from '../slice/create-global-slice'
import type {FCStore, IStoreOptions} from '../types/base'
import {customRequestIdleCallback} from '../utils/idelCallback'

function createReducerManager(
  initialReducers: ReducersMapObject,
  options: IStoreOptions
) {
  // Create an object which maps keys to reducers
  // Adding appInit reducer to skip redux store initialize with incorect reducer warning
  const {debug = false} = options
  const reducers: ReducersMapObject = {
    ...initialReducers,
    appInit: (state = true, action: any) => {
      return state
    },
    debug: (state = debug ?? false, action: any) => {
      return state
    }
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
    hasKey(key: string): boolean {
      return !!reducers[key]
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

export function configureStore<
  GlobalSlice extends ReturnType<typeof createGlobalSlice>,
  State extends {[x: string]: any}
>(
  globalSlices: Array<GlobalSlice>,
  initialState?: State,
  options: IStoreOptions = {}
) {
  const {middlewares, ioRunner, debug} = options || {}
  /**
   * Creating this temp reducers so that ssr state is not lost
   * Also for compatibility with old redux-rewire arch
   */
  const tempReducers: ReducersMapObject = {}
  if (initialState) {
    for (const key in initialState) {
      tempReducers[key] = (state: any = initialState[key]) => state ?? {}
    }
  }

  const reducerManager = createReducerManager(tempReducers, options)
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
  const store: FCStore = createStore(reducerManager.reduce, {}, enhancer)
  const preLoadedCache: Record<string, any> = {}
  let actionQueue: Array<() => void> = []
  store.asyncFunction = options.asyncFunction || customRequestIdleCallback
  const processQueue = () => {
    // Process tasks as long as there is time left and the queue is not empty
    const action = actionQueue.shift()
    if (action && typeof action === 'function') {
      action()
    }
    // If the queue is not empty, schedule the next idle callback
    if (actionQueue.length > 0) {
      store.asyncFunction(processQueue)
    }
  }
  /**
   * Adding some properties on store
   * @param actionFunc
   */
  store.addToQueue = actionFunc => {
    // Optional: Put the reducer manager on the store so it is easily accessible
    actionQueue.push(actionFunc)
    store.asyncFunction(processQueue)
  }
  store.reducerManager = reducerManager
  store.nameSpace = options.nameSpace ?? ''
  store.getServerSnapshot = () => initialState ?? {}
  store.setPreLoadedState = (key: string, state: any) => {
    preLoadedCache[key] = state
  }
  store.getPreLoadedState = (key: string) => preLoadedCache[key]
  store.disableAutoImmutability = () => options?.disableImmer ?? false
  /**
   * End
   */
  globalSlices.forEach(slice => {
    slice.init(store)
  })
  if (typeof ioRunner === 'function') {
    store.ioRunner = ioRunner
  }
  return store
}
