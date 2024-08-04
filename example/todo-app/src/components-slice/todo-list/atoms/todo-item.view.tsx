import React, {useCallback} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {useRewireState} from 'redux-rewire'
import {todoAction} from '../todo-list.actions'
import {Todo} from '../todo-list.type'

interface ITodoItemProps extends Todo {}

const TodoItem = (props: ITodoItemProps) => {
  const {id} = props
  const [, todoItem, actions] = useRewireState('to-do', todoAction, (state) =>
    state.todoList.find((item) => item.id === id)
  )

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
  }

  const handleDelete = useCallback((id: number) => {}, [])

  const handleDone = useCallback((id: number) => {}, [])

  return todoItem ? (
    <Draggable draggableId={props.id.toString()} index={props.id}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, props.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
        >
          <span className="todos__single--text">{todoItem.todo}</span>
          <div>
            <span className="icon" onClick={() => {}}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(props.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(props.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  ) : null
}

export default TodoItem
