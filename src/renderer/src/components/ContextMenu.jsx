import { forwardRef } from 'react'
import { Dropdown } from 'react-bootstrap'

const Toggle = forwardRef(({ children, onClick }, ref) => {
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
Toggle.displayName = 'Toggle'

const itemStyle = { paddingTop: '0.3rem', paddingBottom: '0.3rem' }

// title: "John Doe"
// options: [{label, onClick}, ...]
export default function ContextMenu({ title, options = [], children }) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle}>{children}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          disabled
          style={{
            ...itemStyle,
            color: 'black'
          }}
        >
          {title}
        </Dropdown.Item>
        <Dropdown.Divider />
        {options.map(({ label, icon, className, onClick }, idx) => (
          <Dropdown.Item
            key={idx}
            onClick={onClick}
            className={className ?? ''}
            style={{ ...itemStyle, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <span style={{ marginLeft: '0.6rem' }}>{label}</span>
            {icon}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
