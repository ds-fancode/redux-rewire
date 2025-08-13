import React, {useEffect} from 'react'
import {useRewireState} from '@redux-rewire/react'
import {todoAction} from './todo-list.actions'
import {
  FlexWrapper,
  Header,
  StyledList,
  StyledTodoListWrapper
} from './todo-styles'
import TodoItem from './todo-item/todo-item.view'

const TodoListWrapper = (props: {source: string}) => {
  const [key, todoState, actions] = useRewireState(
    `${props.source}/to-do`,
    todoAction
  )

  useEffect(() => {
    actions.mount()
    function addTodo() {
      actions.addTodo(`${Math.random()} Todo`)
      setTimeout(addTodo, 500)
    }
    setTimeout(addTodo, 2)
  }, [])

  return (
    <StyledTodoListWrapper>
      <Header>{`Task List`}</Header>
      <FlexWrapper>
        <div style={{flex: 1}}>
          <Header>Active Tasks</Header>
          <StyledList>
            {todoState.todoList
              ?.filter(v => !v.isDone)
              ?.map(todoItem => {
                return (
                  <TodoItem
                    {...todoItem}
                    source={key}
                    key={todoItem.id}
                    markDone={actions.handleDone}
                    markUnDone={actions.handleUnDone}
                  />
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
                  <TodoItem
                    {...todoItem}
                    source={key}
                    key={todoItem.id}
                    markDone={actions.handleDone}
                    markUnDone={actions.handleUnDone}
                  />
                )
              })}
          </StyledList>
        </div>
      </FlexWrapper>
    </StyledTodoListWrapper>
  )
}

export default TodoListWrapper
