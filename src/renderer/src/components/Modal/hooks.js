import { useContext } from 'react'
import Context from './Context'

export function useProvider() {
  const value = useContext(Context)
  return value
}
