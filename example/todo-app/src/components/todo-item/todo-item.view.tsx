import React, {useCallback, useEffect, useRef} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {CommonComponentProp} from '../../models/component-prop'
import {identitySelector, noneSelector, useGlobalState, useReduxState, useSharedState} from 'redux-rewire'
import {todoStore} from '../../global-store/todo-store/todo-store'
import {todoItemAction} from './todo-item.action'
import {dropStore} from '../../shared-store/drop-store/drop-store'

interface ITodoItemProps extends CommonComponentProp {
  id: number
}

const TodoItem = (props: ITodoItemProps) => {
  const [, state, actions] = useReduxState(`todo-item-${props.id}`, todoItemAction, identitySelector, props.parentKey)
  const [, todoItem, todoStoreAction] = useGlobalState(todoStore, state => state.todoList.find(item => item.id === props.id))

  const [, hoverCompletedTaskDropId] = useSharedState('todo-drop', dropStore, state => state.hoverCompletedTaskDropId)

  const todoIsDone = hoverCompletedTaskDropId === props.id || todoItem?.isDone

  useEffect(() => {
    if (todoItem)
      actions.mount(todoItem.todo)
  }, [actions, todoItem])

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [state.isEditing])

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    if (state.todoEditInput) {
      todoStoreAction.editTodo({
        todo: state.todoEditInput,
        id: props.id
      })
      actions.setEditing(false)
    }
  }

  const handleDelete = useCallback((id: number) => {
    todoStoreAction.removeTodo(id)
  }, [todoStoreAction])

  const handleDone = useCallback((id: number) => {
    todoStoreAction.changeDoneMark(id)
  }, [todoStoreAction])

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
          {state.isEditing ? (
            <input
              value={state.todoEditInput}
              onChange={(e) => actions.updateInput(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todoIsDone ? (
            <s className="todos__single--text">{todoItem.todo}</s>
          ) : (
            <span className="todos__single--text">{todoItem.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!state.isEditing) {
                  actions.setEditing(!state.isEditing)
                }
              }}
            >
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
