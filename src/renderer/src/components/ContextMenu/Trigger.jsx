// Trigger.jsx
import { useState, useRef, useEffect, useContext } from 'react'

import Context from './Context'

export default function Trigger({ children, menu }) {
  const [id, setId] = useState(crypto.randomUUID())
  const { setShow, setMenu, updateMenu, updatePosition } = useContext(Context)
  const ref = useRef(null)

  const handleContextMenu = (event) => {
    event?.preventDefault()
    const { clientX, clientY, target } = event
    if (ref?.current?.contains(target)) {
      setShow(id)
      setMenu(menu)
      updatePosition(clientX, clientY)
    }
  }

  useEffect(() => {
    updateMenu(id, menu)
  }, [setMenu, id, menu])

  return (
    <div ref={ref} onContextMenu={handleContextMenu}>
      {children}
    </div>
  )
}
