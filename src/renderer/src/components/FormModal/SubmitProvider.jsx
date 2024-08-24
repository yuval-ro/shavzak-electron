import { createContext } from 'react'

export const SubmitContext = createContext()

export default function SubmitProvider({ children, value }) {
  return <SubmitContext.Provider value={value}>{children}</SubmitContext.Provider>
}
