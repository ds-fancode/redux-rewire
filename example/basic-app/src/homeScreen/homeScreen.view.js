import {identitySelector, useGlobalState, useReduxState} from 'redux-rewire'
import {actionSlice} from './homeScreen.actions'
import './homescreen.style.css'
import {useCallback, useRef} from 'react'
import {configStore} from '../globalStore/configStore'

const HomeScreen = (props) => {
  const [, state, actions] = useReduxState(
    'home-screen',
    actionSlice,
    identitySelector
  )
  useGlobalState(configStore, identitySelector)
  const inputRef = useRef()
  const addToDo = useCallback(() => {
    if (inputRef.current) {
      const value = inputRef.current.value
      actions.add(value)
    }
  }, [actions])
  return (
    <div className={'container'}>
      <div className={'actionContainer'}>
        <input ref={inputRef} />
        <button onClick={addToDo}>ADD TO-DO</button>
      </div>
      <div className={'listContainer'}>
        {state.list.map((v) => {
          return <div className={'item'}>Test</div>
        })}
        {state.list.length === 0 ? <div>Your To Do list is empty</div> : null}
      </div>
    </div>
  )
}

export default HomeScreen
