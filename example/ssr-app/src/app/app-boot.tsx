import React, {use} from 'react'
import {useGlobalState} from '@ds-fancode/redux-rewire-react'
import {settingStore} from './store/settings-store'
import {useDataSuspense} from './hooks/use-data-suspense'

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

const AppBootView = (props: any) => {
  const {children} = props
  const [settingKey, settingState, settingActions] =
    useGlobalState(settingStore)
  console.log('AppBootView render 1', settingState.loaded)

  useDataSuspense(settingKey, settingState, () => {
    console.log('calling setting store mount')
    settingActions.mount()
  })
  console.log('AppBootView render 2', settingState.loaded)
  return settingState.loaded ? children : null
}

export const AppBoot = React.memo(AppBootView)
