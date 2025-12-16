import React, {cache, use, useEffect} from 'react'

function test(id: number) {
  console.log('getData')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('getData >> resolve')
      resolve('Hello')
    }, 2000)
  })
}
const getData = cache(test)

export const ServerComp = () => {
  // const [count, setCount] = useState(0)
  console.log('Render > serverComponent 1')

  useEffect(() => {
    console.log('Render > serverComponent mount')
    return () => {
      console.log('Render > serverComponent un - mount')
    }
  }, [])

  const data: any = use(getData(1))
  console.log('Render > serverComponent 2', data)

  return (
    <div>
      <span>{data}</span>
      {/*<span>{count}</span>*/}
    </div>
  )
}
