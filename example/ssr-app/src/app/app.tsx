import {useStore} from '@ds-fancode/redux-rewire-react'
import React, {Suspense, use, useContext, useState} from 'react'
import {DataContext, DataProvider} from './core/data-provider'
import TodoListWrapper from './screen/todo-list'

/////
const map: any = {}
const useTestSuspense = (id: number) => {
  const store = useStore()
  const dataContext = useContext(DataContext)

  let data: any = map[id.toString()]
  console.log('data suspense init', id)

  if (!data) {
    console.log('creating promise', id)
    const promise = new Promise(resolve => {
      setTimeout(() => {
        console.log('resolving promise', id)
        map[id.toString()] = {...map[id.toString()], completed: true}
        resolve(`kamlesh ${id}`)
      }, 5000)
    })
    data = {promise, completed: false}
    map[id.toString()] = data
  }
  if (data.completed) {
    return true
  }
  // if (typeof window === 'undefined') {
  //   console.log('using promise server', id)
  //   return data.promise
  // }
  console.log('using promise client', id)
  return use(data.promise)
}
const TestComponent = () => {
  const [id, setId] = useState(() => {
    console.log('useState initializing')
    return 1
  })
  console.log('TestComponent >> render start', id)
  const data = useTestSuspense(id)
  console.log('TestComponent >> render complete', id)
  return <div onClick={() => setId(id => id + 1)}>{data as string}</div>
}

/////

const Fallback = () => {
  console.log('suspense fallback called')
  return <div>{`showing todo list shimmers...`}</div>
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
          <Suspense fallback={<Fallback />}>
            <TodoListWrapper source={'root'} />
            {/* <TestComponent /> */}
          </Suspense>
        </body>
      </html>
    </DataProvider>
  )
}
