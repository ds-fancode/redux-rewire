import React from 'react'
import './App.css'
import {identitySelector, noneSelector, useGlobalState, useReduxState} from 'redux-rewire'
import {AppAction} from './App.action'
import InputField from '../../ui-components/InputField'
import TodoListWrapper from '../todo-list-wrapper/todo-list-wrapper.view'
import {todoStore} from '../../global-store/todo-store/todo-store'

const App: React.FC = () => {
  const [key, state, actions] = useReduxState('app-root', AppAction, identitySelector)
  const [, , todoStoreActions] = useGlobalState(todoStore, noneSelector)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (state.inputTodo) {
      todoStoreActions.addTodo(state.inputTodo)
      actions.resetInput(undefined)
    }
  }
  return (
    <div className="App">
      <span className="heading">Task Todo</span>
      <InputField value={state.inputTodo} onInputChange={actions.updateInput} onInputSubmit={handleAdd} />
      <TodoListWrapper
        parentKey={key}
      />
    </div>
  )
}

export default App
