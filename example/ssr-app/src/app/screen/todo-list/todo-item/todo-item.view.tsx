import React from 'react'
import {useRewireState} from '@redux-rewire/react'
import {todoAction} from './todo-item.actions'
import styled from 'styled-components'
import type {Todo} from './todo-item.type'

export const StyledListItem = styled.div`
  padding-left: 0.5rem;
  justify-content: space-between;
  height: 2rem;
  display: flex;
  font-size: 1.5rem;
`

const TodoItem = (props: Todo & {source: string}) => {
  const [, state, actions] = useRewireState(
    `${props.source}/${props.id}/item`,
    todoAction,
    state => {
      return state
    },
    {
      overrideInitialState: {
        todo: {id: props.id, todo: props.todo, isDone: props.isDone}
      }
    }
  )

  return (
    <StyledListItem>
      <div>{state.todo?.todo}</div>
      <button
        onClick={state.todo?.isDone ? actions.markUnDone : actions.markDone}
      >
        {state.todo?.isDone ? 'Mark un-done' : 'Mark done'}
      </button>
    </StyledListItem>
  )
}

export default TodoItem
