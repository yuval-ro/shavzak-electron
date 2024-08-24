// menus.jsx
import { useState, useRef, useContext, useCallback } from 'react'
import { CaretLeftFill as Left, CaretRightFill as Right } from 'react-bootstrap-icons'

import ContentLayout from './ContentLayout'
import Context from './Context'
import * as Styled from './styled'

export function MainMenu({ children }) {
  return <Styled.Menu>{children}</Styled.Menu>
}

export function SubMenu({ label, icon, children }) {
  const { rtl } = useContext(Context)
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  const renderSubMenu = useCallback(
    () => (
      <Styled.Menu
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          [rtl ? 'right' : 'left']: '100%',
          zIndex: 1000
        }}
      >
        {children}
      </Styled.Menu>
    ),
    [...children]
  )

  return (
    <Styled.SubMenuWrapper
      ref={ref}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', width: '100%' }}
    >
      <Styled.Item>
        <div style={{ width: '90%', overflow: 'hidden' }}>
          <ContentLayout label={label} icon={icon} />
        </div>
        {rtl ? (
          <Left size=".7rem" className="ms-auto" />
        ) : (
          <Right size=".7rem" className="ms-auto" />
        )}
      </Styled.Item>
      {show && renderSubMenu()}
    </Styled.SubMenuWrapper>
  )
}
