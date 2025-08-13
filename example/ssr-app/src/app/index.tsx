import {hydrateRoot} from 'react-dom/client'
import {App} from './app'
import React from 'react'
import {configureStore} from '@redux-rewire/core'
import {RewireProvider} from '@redux-rewire/react'
import {createLogger} from 'redux-logger'

const logger = createLogger({
  diff: true,
  collapsed: true
  // ...options
})
const ClientApp = () => {
  const store = configureStore([], {}, {middlewares: [logger]})
  return (
    <React.StrictMode>
      <RewireProvider store={store}>
        <App />
      </RewireProvider>
    </React.StrictMode>
  )
}

hydrateRoot(document, <ClientApp />)
