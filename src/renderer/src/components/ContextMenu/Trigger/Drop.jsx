// Drop.jsx
import { useState, useRef, useEffect, useContext } from 'react'
import Context from '../Context'

export default function Drop({ children, menu }) {
  const [id, setId] = useState(crypto.randomUUID())
  const { setShow, setMenu, updateMenu, updatePosition, width } = useContext(Context)
  const ref = useRef(null)

  const handleClick = (event) => {
    event?.preventDefault()
    if (ref?.current) {
      const rect = ref.current?.getBoundingClientRect()
      const left = rect.right
      const top = rect.bottom
      setShow(id)
      setMenu(menu)
      updatePosition(left, top)
    }
  }

  useEffect(() => {
    updateMenu(id, menu)
  }, [setMenu, id, menu, updateMenu])

  return (
    <div ref={ref} onClick={handleClick}>
      {children}
    </div>
  )
}
