import { useState } from 'react'

import Context from './Context'

export default function Provider({ children }) {
  const [modal, setModal] = useState(null)
  const [show, setShow] = useState(false)

  return (
    <Context.Provider
      value={{
        updateModal: (modal) => {
          setModal(modal)
          setShow(true)
        },
        closeModal: () => {
          setShow(false)
        }
      }}
    >
      {show && modal}
      {children}
    </Context.Provider>
  )
}
