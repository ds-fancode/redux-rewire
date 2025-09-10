import {RewireContext} from '../core/Provider'
import {useContext} from 'react'

export const useStore = () => {
  return useContext(RewireContext).store
}
