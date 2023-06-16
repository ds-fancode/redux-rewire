import {CommonComponentProp} from '../../models/component-prop'
import React from 'react'
import {useGlobalState} from 'redux-rewire'
import {todoStore} from '../../global-store/todo-store/todo-store'
import TodoItem from '../todo-item/todo-item.view'

interface ITodoListProps extends CommonComponentProp {
  isDone: boolean
}

export const TodoListView = (props: ITodoListProps) => {
  const [, tasks] = useGlobalState(todoStore, state =>
    state.todoList.filter(item => item.isDone === props.isDone)
  )
  return (
    <>
      {tasks?.map((todoItem, index) => (
        <TodoItem
          id={todoItem.id}
          key={todoItem.id}
          parentKey={props.parentKey}
        />
      ))}
    </>
  )
}
