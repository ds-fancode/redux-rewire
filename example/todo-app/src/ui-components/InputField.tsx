import React, {useRef} from 'react'
import './styles.css'

interface props {
  value: string
  onInputChange: (value: string) => void
  onInputSubmit: () => void
}

const InputField: React.FC<props> = ({value, onInputChange, onInputSubmit}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault()
        onInputSubmit()
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={value}
        ref={inputRef}
        onChange={(e) => {
          e.preventDefault()
          onInputChange(e.target.value)
        }}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  )
}

export default InputField
