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

  const onDragUpdate = (result: any) => {
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

  const onDragEnd = (result: any) => {
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
    <div>
      <span className="heading">Task Todo</span>
      <InputField
        value={'kamlesh'}
        // onInputChange={actions.updateInput}
        onInputChange={() => {}}
        onInputSubmit={handleAdd}
      />
      <div className="container">
        <div>
          <span className="todos__heading">Active Tasks</span>
          {todoState.todoList?.map((todoItem) => (
            <TodoItem {...todoItem} key={todoItem.id} />
          ))}
        </div>

        <div className={`todos  `}>
          <span className="todos__heading">Completed Tasks</span>
          {todoState.todoList?.map((todoItem) => (
            <TodoItem {...todoItem} key={todoItem.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoListWrapper
