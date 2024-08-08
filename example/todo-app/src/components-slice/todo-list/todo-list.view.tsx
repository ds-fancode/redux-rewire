import React from 'react'
import {identitySelector, keysSelector, useRewireState} from 'redux-rewire'
import TodoItem from './atoms/todo-item.view'
import {todoAction} from './todo-list.actions'
import {TodoInput} from './atoms/todo-input'
import styles from './todo-styles.module.css'
const TodoListWrapper = (props: any) => {
  const [, todoState, actions] = useRewireState(
    'to-do',
    todoAction,
    identitySelector
  )

  return (
    <div className={styles.container}>
      <div className={styles.todoHeaderContainer}>
        <span className={styles.todoHeaderTitle}>{`Task List`}</span>
        <TodoInput />
      </div>
      <div className={styles.todoListContainer}>
        <div className={styles.listContainer}>
          <div className={styles.todos__heading}>Active Tasks</div>
          {todoState.todoList
            ?.filter((v) => !v.isDone)
            ?.map((todoItem) => (
              <TodoItem {...todoItem} key={todoItem.id} />
            ))}
        </div>

        <div className={styles.listContainer}>
          <div className={styles.todos__heading}>Completed Tasks</div>
          {todoState.todoList
            ?.filter((v) => v.isDone)
            .map((todoItem) => (
              <TodoItem {...todoItem} key={todoItem.id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TodoListWrapper
