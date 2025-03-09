import React from 'react'
import Styled from 'styled-components'
import TodoListWrapper from './screen/todo-list'

const AppWrapper = Styled.div`
background-color: blue;
`
export const App = () => {
  return (
    <html lang={'en'}>
      <head>
        <title>Kamlesh</title>
      </head>
      <body>
        <TodoListWrapper source={`1`} />
      </body>
    </html>
  )
}
