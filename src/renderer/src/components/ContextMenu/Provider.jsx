// Provider.jsx
import { useState, useRef, useEffect } from 'react'
import Context from './Context'

export default function Provider({ dir, width, children }) {
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [menu, setMenu] = useState(null)
  const [show, setShow] = useState('') // Trigger ID
  const ref = useRef(null) // Track mouse clicks

  function updatePosition(left, top) {
    setPosition({ left: dir === 'rtl' ? left - width : left, top })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref?.current && !ref.current.contains(event.target)) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // const renderMenu = useCallback(
  //   () => (
  //     <div
  //       ref={ref}
  //       style={{
  //         ...position,
  //         position: 'absolute',
  //         backgroundColor: 'white',
  //         zIndex: 1000,
  //         maxWidth: width
  //       }}
  //     >
  //       {menu}
  //     </div>
  //   ),
  //   [position, menu]
  // )

  return (
    <Context.Provider
      value={{
        width,
        setShow,
        setMenu,
        updatePosition,
        updateMenu: (triggerId, menu) => {
          if (show === triggerId) {
            setMenu(menu)
          }
        },
        dir,
        rtl: dir === 'rtl'
      }}
    >
      {children}
      {show && (
        <div
          ref={ref}
          style={{
            ...position,
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: 1000,
            width
          }}
        >
          {menu}
        </div>
      )}
    </Context.Provider>
  )
}
