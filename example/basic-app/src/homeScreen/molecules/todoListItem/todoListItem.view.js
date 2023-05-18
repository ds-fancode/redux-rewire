import {identitySelector, keyHandler, useParentState, useReduxState} from 'redux-rewire'
import {actionSlice} from './todoListItem.actions'
import './todoListItem.style.css'
import {initialState as homeInitialState} from '../../homeScreen.init'

const TodoListItem = (props) => {
  const [key, state, actions] = useReduxState(
     keyHandler.concat(props.parentKey, 'todo-list-item' + props.listIndex),
    actionSlice,
    identitySelector
  )
  const item = useParentState(key, homeInitialState, _ => _.list[props.listIndex])
  return (
    <div className={'item'}>{item ?? 'NA'}</div>
  )
}

export default TodoListItem
