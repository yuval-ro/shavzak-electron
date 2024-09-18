// FormModal.jsx
import { useRef, useContext } from 'react'
import Form from './Form'
import Layout from './Layout'

import Context from './Context'
import ParentContext from '../Context'

export default function FormModal({ title, fieldArray, onSubmit, onCancel }) {
  const formikRef = useRef(null)
  const { closeModal } = useContext(ParentContext)
  return (
    <Context.Provider
      value={{
        formikRef,
        onSubmit: (values) => {
          if (onSubmit) {
            onSubmit(values)
          }
          closeModal()
        },
        onCancel: () => {
          if (onCancel) {
            onCancel()
          }
          closeModal()
        }
      }}
    >
      <Layout title={title} form={<Form fieldArray={fieldArray} onSubmit={onSubmit} />} />
    </Context.Provider>
  )
}
