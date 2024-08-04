import {
  DragDropContext,
  DragUpdate,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import React from 'react'
import {
  identitySelector,
  noneSelector,
  useGlobalState,
  useRewireState,
} from 'redux-rewire'
import {settingStore} from '../../global-store/settings-store/setting-store'
import InputField from '../../ui-components/InputField'
import TodoItem from './atoms/todo-item.view'
import {todoAction} from './todo-list.actions'

const TodoListWrapper = (props: any) => {
  const [, todoState, actions] = useRewireState(
    'to-do',
    todoAction,
    identitySelector
  )
  const [, , settingAction] = useGlobalState(settingStore, noneSelector)

  // const [, , dropStoreAction] = useSharedState(
  //   'todo-drop',
  //   dropStore,
  //   noneSelector
  // )

  const onDragUpdate = (result: DragUpdate) => {
    const {destination, source} = result
    if (
      destination &&
      destination.droppableId !== source.droppableId &&
      source.index
    ) {
      // dropStoreAction.setHoverCompletedTaskDropId(source.index)
    } else {
      // dropStoreAction.setHoverCompletedTaskDropId(-1)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result
    // dropStoreAction.setHoverCompletedTaskDropId(-1)

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId) {
      return
    }

    // actions.changeDoneMark(source.index)
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    // if (state.inputTodo) {
    actions.addTodo({
      id: Date.now(),
      todo: 'Some work',
      isDone: false,
    })
    // actions.resetInput(undefined)
    // }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <span className="heading">Task Todo</span>
      <InputField
        value={'kamlesh'}
        // onInputChange={actions.updateInput}
        onInputChange={() => {}}
        onInputSubmit={handleAdd}
      />
      <div className="container">
        <Droppable droppableId="ActiveTodos">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              {todoState.todoList?.map((todoItem) => (
                <TodoItem {...todoItem} key={todoItem.id} />
              ))}
              {/*<TodoListView isDone={false} />*/}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="CompletedTodos">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? 'dragcomplete' : 'remove'
              }`}
            >
              <span className="todos__heading">Completed Tasks</span>
              {todoState.todoList?.map((todoItem) => (
                <TodoItem {...todoItem} key={todoItem.id} />
              ))}
              {/*<TodoListView isDone={true} />*/}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default TodoListWrapper
