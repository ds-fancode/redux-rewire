// copilot:ignore
import InputField from '../../../ui-components/InputField'
import React, {useCallback} from 'react'
import {keysSelector, useRewireState} from 'redux-rewire'
import {todoAction} from '../todo-list.actions'

const TodoInputView = (props: any) => {
  const [, todoState, actions] = useRewireState(
    'to-do',
    todoAction,
    keysSelector(['inputValue'])
  )
  const handleAdd = useCallback(() => {
    actions.addTodo(undefined)
  }, [])
  const onChange = useCallback((value: string) => {
    actions.updateInputValue(value)
  }, [])
  return (
    <InputField
      value={todoState.inputValue}
      onInputChange={onChange}
      onInputSubmit={handleAdd}
    />
  )
}

export const TodoInput = React.memo(TodoInputView)
