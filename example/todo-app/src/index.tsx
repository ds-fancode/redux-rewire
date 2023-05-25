import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import {configureStore, RewireProvider} from 'redux-rewire'

const IndexRender = function() {
  const store = configureStore({}, {}, {
    middlewares: [],
  });
  return (
    <RewireProvider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RewireProvider>
  )
}

ReactDOM.render(
  <IndexRender />,
  document.getElementById('root')
)
