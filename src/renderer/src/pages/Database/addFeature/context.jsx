import { createContext, useContext } from 'react'

const FormSubmitContext = createContext()

export const useFormSubmit = () => useContext(FormSubmitContext)

export const FormSubmitProvider = ({ children, value }) => (
  <FormSubmitContext.Provider value={value}>{children}</FormSubmitContext.Provider>
)
