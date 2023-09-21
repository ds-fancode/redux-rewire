import React, {useRef} from 'react'
import './styles.css'

interface props {}

const AddTodo: React.FC<props> = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        const value = (e.nativeEvent.target as any)?.[0]?.value
        //TODO: handleAdd(value)

        inputRef.current?.blur()
        e.preventDefault()
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        ref={inputRef}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  )
}

export default AddTodo
