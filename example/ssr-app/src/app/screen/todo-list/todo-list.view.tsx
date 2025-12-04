import {useRewireState} from '@ds-fancode/redux-rewire-react'
import React, {useCallback, useState} from 'react'
// import {useDataSuspense} from '../../hooks/use-data-suspense'
import {useDataSuspense} from '../../hooks/use-data-suspense'
import TodoItem from './todo-item/todo-item.view'
import {todoAction} from './todo-list.actions'
import {
  FlexWrapper,
  Header,
  StyledList,
  StyledTodoListWrapper
} from './todo-styles'

const TodoListWrapper = (props: {source: string}) => {
  const [wrapperKey, setWrapperKey] = useState(1)
  const [key, todoState, actions] = useRewireState(
    `${props.source}/to-do-wrapper/${wrapperKey}`,
    todoAction
  )
  console.log('TodoListWrapper render start', key, todoState.loaded)
  useDataSuspense(key, todoState, () => {
    actions.mount()
  })

  const test = useCallback(() => {
    actions.addTodo(`test ${Date.now()}`)
  }, [actions])

  console.log('TodoListWrapper render completed', key, todoState.loaded)
  return (
    <StyledTodoListWrapper>
      <Header>
        <span>Task List 2</span>
        <button
          onClick={() => {
            setWrapperKey(s => s + 1)
          }}
        >
          Reset
        </button>
        <button onClick={test}>Add Todo</button>
      </Header>
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
