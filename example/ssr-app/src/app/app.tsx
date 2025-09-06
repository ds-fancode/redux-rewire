import React, {Suspense, use} from 'react'
import TodoListWrapper from './screen/todo-list'
import {AppBoot} from './app-boot'
import {DataProvider} from './core/data-provider'

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
    <DataProvider>
      <html lang={'en'}>
        <head>
          <title>Kamlesh</title>
        </head>
        <body>
          <Suspense fallback={<div>{`showing todo list shimmers...`}</div>}>
            <AppBoot>
              <TodoListWrapper source={'root'} />
            </AppBoot>
          </Suspense>
        </body>
      </html>
    </DataProvider>
  )
}
