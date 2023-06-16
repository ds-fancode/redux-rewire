import {CommonComponentProp} from '../../models/component-prop'
import {DragDropContext, DragUpdate, Droppable, DropResult} from 'react-beautiful-dnd'
import React from 'react'
import {noneSelector, useGlobalState, useSharedState} from 'redux-rewire'
import {todoStore} from '../../global-store/todo-store/todo-store'
import {TodoListView} from '../todo-list/todo-list.view'
import {dropStore} from '../../shared-store/drop-store/drop-store'

const TodoListWrapper = (props: CommonComponentProp) => {
  const [, , todoStoreAction] = useGlobalState(todoStore, noneSelector)

  const [, , dropStoreAction] = useSharedState('todo-drop', dropStore, noneSelector)

  const onDragUpdate = (result: DragUpdate) => {
    const {destination, source} = result
    if (
      destination &&
      destination.droppableId !== source.droppableId  &&
      source.index
    ) {
      dropStoreAction.setHoverCompletedTaskDropId(source.index)
    } else {
      dropStoreAction.setHoverCompletedTaskDropId(-1)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result
    dropStoreAction.setHoverCompletedTaskDropId(-1)

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId
    ) {
      return
    }

    todoStoreAction.changeDoneMark(source.index)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div className="container">
        <Droppable droppableId="ActiveTodos">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              <TodoListView
                parentKey={props.parentKey}
                isDone={false}
              />
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
              <TodoListView
                parentKey={props.parentKey}
                isDone={true}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default TodoListWrapper
