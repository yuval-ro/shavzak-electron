import { forwardRef } from 'react'

const CustomToggle = forwardRef(function renderCustomToggle({ children, onClick }, ref) {
  return (
    <span
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
    </span>
  )
})
export default CustomToggle
