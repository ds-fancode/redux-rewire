import React, {useCallback} from 'react'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {useRewireState} from '@redux-rewire/react'
import {todoAction} from '../todo-list.actions'
import {Todo} from '../todo-list.type'

interface ITodoItemProps extends Todo {
  source: string
}

const TodoItem = (props: ITodoItemProps) => {
  const {id, source} = props
  const [, todoItem, actions] = useRewireState(source, todoAction, state =>
    state.todoList.find(item => item.id === id)
  )

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
  }

  const handleDelete = useCallback(() => {
    actions.handleDelete(props)
  }, [])

  const handleDone = useCallback(() => {
    actions.handleDone(props)
  }, [])

  return todoItem ? (
    <form onSubmit={e => handleEdit(e, props.id)} className={`todos__single `}>
      <span className="todos__single--text">{todoItem.todo}</span>
      <div>
        <span className="icon" onClick={() => {}}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={handleDelete}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={handleDone}>
          <MdDone />
        </span>
      </div>
    </form>
  ) : null
}

export default TodoItem
