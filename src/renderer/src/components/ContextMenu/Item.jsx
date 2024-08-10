import * as Styled from './Styled'
import ItemContent from './ItemContent.jsx'

export default function Item({ label, icon, disabled, danger, onClick }) {
  return (
    <Styled.Item onClick={onClick} disabled={disabled} $danger={danger}>
      <ItemContent label={label} icon={icon} />
    </Styled.Item>
  )
}
