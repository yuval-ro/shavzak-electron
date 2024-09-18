// items.jsx
import { useContext } from 'react'
import { FormCheck } from 'react-bootstrap'

import Context from './Context'
import ContentLayout from './ContentLayout'
import Styled from './styled'

export function ActionItem({ label, icon, disabled, variant, onClick, close }) {
  const { setShow } = useContext(Context)
  return (
    <Styled.Item
      onClick={() => {
        if (onClick) {
          onClick()
        }
        if (close) {
          setShow(false)
        }
      }}
      disabled={disabled}
      $variant={variant}
      style={{ cursor: 'pointer' }}
    >
      <ContentLayout label={label} icon={icon} />
    </Styled.Item>
  )
}

export function CheckItem({ type, label, icon, disabled, checked, onToggle }) {
  const { rtl } = useContext(Context)
  return (
    <Styled.Item onClick={onToggle} style={{ cursor: 'pointer' }}>
      <ContentLayout label={label} icon={icon} />
      <FormCheck
        type={type}
        checked={checked}
        disabled={disabled}
        readOnly
        className={rtl ? 'ms-auto' : 'me-auto'}
      />
    </Styled.Item>
  )
}

export function HeaderItem({ label, icon, variant }) {
  return (
    <Styled.Item $static $variant={variant}>
      <ContentLayout label={label} icon={icon} />
    </Styled.Item>
  )
}
