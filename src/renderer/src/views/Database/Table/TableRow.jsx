// TableRow.jsx
import { useContext, useCallback } from 'react'

import ContextMenu from '#src/components/ContextMenu'
import {
  TrashFill as Delete,
  PencilFill as Edit,
  Check as Attend,
  Question as Status
} from 'react-bootstrap-icons'

import Styled from './styled'
import { MIN_CELL_WIDTH } from './CONSTS'
import TableContext from './Context'
import ViewContext from '../Context'

export default function TableRow({ rowData }) {
  const { shift, cols, sort, keyword } = useContext(TableContext)
  const { actions } = useContext(ViewContext)

  const id = rowData._id

  const renderContextMenu = useCallback(
    () => (
      <ContextMenu.MainMenu>
        <ContextMenu.HeaderItem label={rowData?.label} />
        <ContextMenu.SubMenu label="סטאטוס" icon={<Status size="1.5rem" />}>
          <ContextMenu.CheckItem
            type="radio"
            variant="success"
            checked={!shift?.unavailable?.includes(id)}
            label="פעיל"
            close
            onToggle={() => actions?.setStatus(id, false)}
          />
          <ContextMenu.CheckItem
            type="radio"
            variant="danger"
            checked={shift?.unavailable?.includes(id)}
            label="לא פעיל"
            onToggle={() => actions?.setStatus(id, true)}
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
          onClick={() => actions?.promptEditing(id)}
          close
        />
        <ContextMenu.ActionItem
          label="מחק"
          icon={<Delete size="1rem" />}
          onClick={() => actions?.promptRemoval(id)}
          variant="danger"
          close
        />
      </ContextMenu.MainMenu>
    ),
    [rowData]
  )

  const renderStatusCell = useCallback(() => {
    if (!shift?.unavailable?.includes(id)) {
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
  }, [rowData])

  const renderCells = useCallback(
    () =>
      cols.map(({ name }, idx) => (
        <Styled.Data.Cell
          key={idx}
          style={{ minWidth: MIN_CELL_WIDTH }}
          // className={
          //   idx === sort?.idx
          //     ? 'bg-primary bg-opacity-10'
          //     : keyword.length > 0 &&
          //         (rowData[name]?.label ?? rowData[name]?.value)?.includes(keyword)
          //       ? 'bg-warning-subtle'
          //       : ''
          // }
        >
          {rowData[name]
            ? Array.isArray(rowData[name])
              ? rowData[name].map((item) => item?.label ?? item?.value).join(', ')
              : rowData[name]?.label ?? rowData[name]?.value
            : null}
        </Styled.Data.Cell>
      )),
    [rowData]
  )

  return (
    <ContextMenu.Trigger.Global menu={renderContextMenu()}>
      <Styled.Data.Row className="bg-body">
        {renderCells()}
      </Styled.Data.Row>
    </ContextMenu.Trigger.Global>
  )
}
