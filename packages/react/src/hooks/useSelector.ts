import {useContext, useEffect, useState} from 'react'
import {RewireContext} from '../core/Provider'

export const useSelector = () => {
  const {store} = useContext(RewireContext)
  const [state, setState] = useState()

  useEffect(() => {})

  return null
}
