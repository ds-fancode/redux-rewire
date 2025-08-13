import React, {Suspense, use} from 'react'
import TodoListWrapper from './screen/todo-list'

const LazyComp = () => {
  const data: any = use(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello')
      }, 1000)
    })
  )
  return <div>{data}</div>
}

export const App = () => {
  console.log('Render > app')
  return (
    <html lang={'en'}>
      <head>
        <title>Kamlesh</title>
      </head>
      <body>
        <Suspense fallback={<div>{`showing todo list shimmers...`}</div>}>
          <TodoListWrapper source={'root'} />
        </Suspense>
      </body>
    </html>
  )
}
