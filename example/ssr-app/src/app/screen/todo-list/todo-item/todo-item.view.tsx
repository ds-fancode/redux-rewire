import {useRewireState} from '@ds-fancode/redux-rewire-react'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {todoAction} from './todo-item.actions'
import type {Todo} from './todo-item.type'

export const StyledListItem = styled.div`
  padding-left: 0.5rem;
  justify-content: space-between;
  height: 2rem;
  display: flex;
  font-size: 1.5rem;
`

const TodoItem = React.memo(
  (props: Todo & {source: string; markUnDone: any; markDone: any}) => {
    const [, state, actions] = useRewireState(
      `${props.source}/item/${props.id}`,
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
    useEffect(() => {
      console.log('TodoItem effect', props.isDone, state.todo?.isDone)
      if (props.isDone !== state.todo?.isDone) {
        actions.updateItem({
          id: props.id,
          todo: props.todo,
          isDone: props.isDone
        })
      }
    }, [props.isDone, state.todo?.isDone])

    return (
      <StyledListItem>
        <div>{state.todo?.todo}</div>
        <button
          onClick={() => {
            return state.todo?.isDone
              ? props.markUnDone(state.todo)
              : props.markDone(state.todo)
          }}
        >
          {state.todo?.isDone ? 'Mark un-done' : 'Mark done'}
        </button>
      </StyledListItem>
    )
  }
)

export default TodoItem
