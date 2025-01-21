import express from 'express'
import {renderer} from './renderer'
import path from 'path'

const app = express()

app.use(
  // '*.js',
  express.static(path.resolve(process.cwd(), 'dist/client'), {
    // fallthrough: false
  })
)

app.get('*', renderer)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
