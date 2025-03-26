import React, {Suspense, use} from 'react'
import {ServerComp} from './server-comp'

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
  const [load, setLoad] = React.useState(false)
  console.log('Render > app')
  return (
    <html lang={'en'}>
      <head>
        <title>Kamlesh</title>
      </head>
      <body>
        <div onClick={() => setLoad(true)}>Title</div>
        <Suspense fallback={<div>Loading 1...</div>}>
          <ServerComp />
        </Suspense>
        {/*<Suspense fallback={<div>Loading 2...</div>}>*/}
        {/*  {load ? <ServerComp /> : null}*/}
        {/*</Suspense>*/}
      </body>
    </html>
  )
}
