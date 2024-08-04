import {
  createActionSlice,
  createInitialState,
  createReducerSlice,
  createSharedState,
} from 'redux-rewire'

type IDropState = {
  hoverCompletedTaskDropId: number
}

const dropStoreInitialState = createInitialState<IDropState>('drop-store', {
  hoverCompletedTaskDropId: -1,
})

const dropStoreReducer = createReducerSlice(dropStoreInitialState, {
  setHoverCompletedTaskDropId: (state, dropIndex: number) => {
    state.hoverCompletedTaskDropId = dropIndex
    return state
  },
})

const dropStoreAction = createActionSlice(dropStoreReducer, {
  setHoverCompletedTaskDropId: async (dropIndex: number, {state}) => {
    // send async analytics for hover completedTask drop index
  },
})

const partialKey = 'dropStore'

export const dropStore = createSharedState(partialKey, dropStoreAction)
