export * from 'redux'
export * from 'react-redux'

export type {FCStore} from './core/create-store'
export {configureStore} from './core/create-store'
export {RewireProvider, RewireContext} from './shared/provider'
/**
 * Helpers
 */
export {identitySelector} from './helper/idenity-selector'
export {noneSelector} from './helper/none-selector'
export {keysSelector} from './helper/keys-selector'
export {keyHandler} from './helper/key-handler'
/**
 * Every thing exported from redux and react-redux
 */
export {RESERVED_ACTIONS} from './constant'
/**
 * New APIs
 */

export {getParentState} from './helper/get-parent-state'

/**
 * Below are the legacy apis and will be deprecated in the later versions
 */
export {createReducerSlice as createReducerSliceDeprecated} from './core/create-reducer-slice'
export {createActionSlice as createActionSliceDeprecated} from './core/create-action-slice'
export {createInitialState as createInitialStateDeprecated} from './core/create-initital-state'
export {createGlobalState as createGlobalStateDeprecated} from './core/create-global-state'

export {useReduxState as useRewireStateDeprecated} from './hooks/use-redux-state'
export {useGlobalState as useGlobalStateDeprecated} from './hooks/use-global-state'
export {useSharedState as useSharedStateDeprecated} from './hooks/use-shared-state'
export {useParentState as useParentStateDeprecated} from './hooks/use-parent-state'
export {createSharedState as createSharedStateDeprecated} from './core/create-shared-state'
