import React, {useEffect} from 'react'
import {useGlobalState, useRewireState} from '@redux-rewire/react'
import TodoItem from './atoms/todo-item.view'
import {todoAction} from './todo-list.actions'
import {TodoInput} from './atoms/todo-input'
import styles from './todo-styles.module.css'
import {settingStore} from '../../global-store/settings-store'

const TodoListWrapper = (props: any) => {
  const [key, todoState, actions] = useRewireState('to-do', todoAction, _ => _)
  const [settingState, settingActions] = useGlobalState(settingStore)
  useEffect(() => {
    actions.mount()
  }, [])
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
            ?.filter(v => !v.isDone)
            ?.map(todoItem => (
              <TodoItem {...todoItem} key={todoItem.id} source={key} />
            ))}
        </div>

        <div className={styles.listContainer}>
          <div className={styles.todos__heading}>Completed Tasks</div>
          {todoState.todoList
            ?.filter(v => v.isDone)
            .map(todoItem => (
              <TodoItem {...todoItem} key={todoItem.id} source={key} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TodoListWrapper
