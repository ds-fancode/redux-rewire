export {configureStore, FCStore} from './core/create-store'
export {RewireProvider, RewireContext} from './shared/provider'
/**
 * Helpers
 */
export {identitySelector} from './helper/idenity-selector'
export {identityReducer} from './helper/idenity-reducer'
export {noneSelector} from './helper/none-selector'
export {keysSelector} from './helper/keys-selector'
export {keyHandler} from './helper/key-handler'
/**
 * Every thing exported from redux and react-redux
 */
export * from './constant'
export * from 'redux'
export * from 'react-redux'
/**
 * New APIs
 */
export {createInitialState, IdentityKey} from './core/create-initital-state'
export {createGlobalState} from './core/create-global-state'
export {createReducerSlice} from './core/create-reducer-slice'
export {createActionSlice} from './core/create-action-slice'

export {getParentState} from './helper/get-parent-state'
/**
 * Advance feature capabilities
 */
export {useRewireState} from './hooks/use-rewire-state'
export {useGlobalState} from './hooks/use-global-state'
export {useSharedState} from './hooks/use-shared-state'
export {useParentState} from './hooks/use-parent-state'
export {createSharedState} from './core/create-shared-state'
export {sharedStoreSelector} from './helper/shared-store-selector'

/**
 * Below are the legacy apis and will be deprecated in the later versions
 */
export {createReducerSlice as createReducerSliceDeprecated} from './legacy/core/create-reducer-slice'
export {createActionSlice as createActionSliceDeprecated} from './legacy/core/create-action-slice'
export {createInitialState as createInitialStateDeprecated} from './legacy/core/create-initital-state'
export {createGlobalState as createGlobalStateLegacy} from './legacy/core/create-global-state'

export {useReduxState as useRewireStateDeprecated} from './legacy/hooks/use-redux-state'
export {useGlobalState as useGlobalStateDeprecated} from './legacy/hooks/use-global-state'
export {useSharedState as useSharedStateDeprecated} from './legacy/hooks/use-shared-state'
export {useParentState as useParentStateDeprecated} from './legacy/hooks/use-parent-state'
export {createSharedState as createSharedStateDeprecated} from './legacy/core/create-shared-state'
