import React from 'react'
import Styled from 'styled-components'

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
        <AppWrapper>Kamlesh</AppWrapper>
      </body>
    </html>
  )
}
