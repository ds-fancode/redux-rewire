import React, {useRef} from 'react'
import './styles.css'

interface props {
  value: string
  onInputChange: React.Dispatch<string>
  onInputSubmit: (e: React.FormEvent) => void
}

const InputField: React.FC<props> = ({value, onInputChange, onInputSubmit}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        onInputSubmit(e)
        inputRef.current?.blur()
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={value}
        ref={inputRef}
        onChange={(e) => onInputChange(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  )
}

export default InputField
