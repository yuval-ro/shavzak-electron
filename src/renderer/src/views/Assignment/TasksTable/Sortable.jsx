import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import * as Styled from './Styled'

const Sortable = Object.freeze({
  Wrapper: SortableContainer(({ children }) => (
    <div
      style={{ paddingRight: '0' }}
      className="SortableWrapper"
      onMouseDown={() =>
        document
          .querySelectorAll('.SortableWrapper')
          .forEach((el) => (el.style.cursor = 'grabbing'))
      }
      onMouseUp={() =>
        document.querySelectorAll('.SortableWrapper').forEach((el) => (el.style.cursor = 'default'))
      }
    >
      {children}
    </div>
  )),
  Row: SortableElement(({ children }) => <Styled.Data.Row>{children}</Styled.Data.Row>)
})
export default Sortable
