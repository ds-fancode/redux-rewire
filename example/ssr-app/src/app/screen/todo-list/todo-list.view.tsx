import React, {useEffect} from 'react'
import {useRewireState} from '@redux-rewire/react'
import {todoAction} from './todo-list.actions'
import {
  Header,
  StyledList,
  StyledListItem,
  StyledListWrapper,
  StyledTodoListWrapper
} from './todo-styles'

const TodoListWrapper = (props: {source: string}) => {
  const [, todoState, actions] = useRewireState(
    `${props.source}/to-do`,
    todoAction
  )

  useEffect(() => {
    actions.mount()
    function addTodo() {
      actions.addTodo(`${Math.random()} Todo`)
      setTimeout(addTodo, 500)
    }
    setTimeout(addTodo, 500)
  }, [])

  return (
    <StyledTodoListWrapper>
      <Header>{`Task List`}</Header>
      <StyledListWrapper>
        <div style={{flex: 1}}>
          <Header>Active Tasks</Header>
          <StyledList>
            {todoState.todoList
              ?.filter(v => !v.isDone)
              ?.map(todoItem => {
                return (
                  <StyledListItem key={todoItem.id}>
                    {todoItem.todo}
                  </StyledListItem>
                )
              })}
          </StyledList>
        </div>

        <div style={{flex: 1}}>
          <Header>Completed Tasks</Header>
          <StyledList>
            {todoState.todoList
              ?.filter(v => v.isDone)
              .map(todoItem => {
                return (
                  <StyledListItem key={todoItem.id}>
                    {todoItem.todo}
                  </StyledListItem>
                )
              })}
          </StyledList>
        </div>
      </StyledListWrapper>
    </StyledTodoListWrapper>
  )
}

export default TodoListWrapper
