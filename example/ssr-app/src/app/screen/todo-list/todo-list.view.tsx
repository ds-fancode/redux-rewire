import React from 'react'
import {useRewireState} from '@ds-fancode/redux-rewire-react'
import {todoAction} from './todo-list.actions'
import {
  FlexWrapper,
  Header,
  StyledList,
  StyledTodoListWrapper
} from './todo-styles'
import TodoItem from './todo-item/todo-item.view'
import {useDataSuspense} from '../../hooks/use-data-suspense'

const TodoListWrapper = (props: {source: string}) => {
  const [key, todoState, actions] = useRewireState(
    `${props.source}/to-do`,
    todoAction
  )
  useDataSuspense(key, todoState, () => {
    actions.mount()
  })

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
