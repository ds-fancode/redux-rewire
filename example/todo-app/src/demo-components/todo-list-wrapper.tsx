import React from 'react'

const sampleTasks = ['Sample task 1', 'Sample task 2']

const TodoListWrapper = (props: {}) => {

  return (
    <div className="todos container">
      <span className="todos__heading">ToDo Tasks</span>
      {
        sampleTasks?.map((todoItem, index) => (
          <div key={todoItem} className={'todos__single'}>
            <span className="todos__single--text">{todoItem}</span>
          </div>
        ))
      }
    </div>
  )
}

export default TodoListWrapper
