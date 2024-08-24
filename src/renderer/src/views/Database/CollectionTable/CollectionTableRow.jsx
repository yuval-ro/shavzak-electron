import { useContext } from 'react'

import ContextMenu from '#src/components/ContextMenu'
import {
  TrashFill as Delete,
  PencilFill as Edit,
  Check as Attend,
  Question as Status
} from 'react-bootstrap-icons'

import * as Styled from './styles'
import { MIN_CELL_WIDTH } from './CONSTS'
import TableContext from './Context'
import ViewContext from '../Context'

export default function CollectionTableRow({ row }) {
  const { shift, cols, sortIdx, keyword } = useContext(TableContext)
  const { actions } = useContext(ViewContext)

  function renderStatusCell(row) {
    if (!shift?.unavailable?.includes(row._id)) {
      return (
        <Styled.Data.Cell className={'bg-success bg-opacity-10 text-success'}>
          פעיל
        </Styled.Data.Cell>
      )
    } else {
      return (
        <Styled.Data.Cell className={'bg-danger bg-opacity-10 text-danger'}>
          לא פעיל
        </Styled.Data.Cell>
      )
    }
  }

  const renderMenu = (row) => (
    <ContextMenu.MainMenu>
      <ContextMenu.HeaderItem label={row?.label} />
      <ContextMenu.SubMenu label="סטאטוס" icon={<Status size="1.5rem" />}>
        <ContextMenu.CheckItem
          type="radio"
          variant="success"
          checked={!shift?.unavailable?.includes(row._id)}
          label="פעיל"
          close
          onToggle={() => actions?.setStatus(row._id, false)}
        />
        <ContextMenu.CheckItem
          type="radio"
          variant="danger"
          checked={shift?.unavailable?.includes(row._id)}
          label="לא פעיל"
          onToggle={() => actions?.setStatus(row._id, true)}
        />
      </ContextMenu.SubMenu>
      <ContextMenu.SubMenu label="נוכחות" icon={<Attend size="1.5rem" />}>
        <ContextMenu.CheckItem
          type="checkbox"
          variant="success"
          // checked={!shift?.unavailable?.includes(row._id)}
          label="משמרת א"
          // onToggle={() => actions?.setStatus(row._id, false)}
        />
        <ContextMenu.CheckItem
          type="checkbox"
          variant="success"
          // checked={!shift?.unavailable?.includes(row._id)}
          label="משמרת ב"
          // onToggle={() => actions?.setStatus(row._id, false)}
        />
        <ContextMenu.CheckItem
          type="checkbox"
          variant="success"
          // checked={!shift?.unavailable?.includes(row._id)}
          label="משמרת ג"
          // onToggle={() => actions?.setStatus(row._id, false)}
        />
      </ContextMenu.SubMenu>
      <ContextMenu.ActionItem
        label="ערוך פרטים"
        icon={<Edit size="1rem" />}
        onClick={() => actions?.promptEdit(row._id)}
        close
      />
      <ContextMenu.ActionItem
        label="מחק"
        icon={<Delete size="1rem" />}
        onClick={() => actions?.promptDelete(row._id)}
        variant="danger"
        close
      />
    </ContextMenu.MainMenu>
  )

  return (
    <ContextMenu.Trigger menu={renderMenu(row)}>
      <Styled.Data.Row className="bg-body">
        {cols.map(({ name }, idx) => (
          <Styled.Data.Cell
            key={idx}
            style={{ minWidth: MIN_CELL_WIDTH }}
            className={
              idx === sortIdx
                ? 'bg-primary bg-opacity-10'
                : keyword.length > 0 && (row[name]?.label ?? row[name]?.value)?.includes(keyword)
                  ? 'bg-warning-subtle'
                  : ''
            }
          >
            {row[name]
              ? Array.isArray(row[name])
                ? row[name].map((item) => item?.label ?? item?.value).join(', ')
                : row[name]?.label ?? row[name]?.value
              : null}
          </Styled.Data.Cell>
        ))}
        {renderStatusCell(row)}
      </Styled.Data.Row>
    </ContextMenu.Trigger>
  )
}
