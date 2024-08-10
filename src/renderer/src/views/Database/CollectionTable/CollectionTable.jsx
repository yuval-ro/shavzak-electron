/**
 * @file /src/views/components/CollectionTable/CollectionTable.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
  FaSort as Sort,
  FaFilter as Filter,
  FaEdit as Edit,
  FaTrash as Delete,
  FaCheck as Status
} from 'react-icons/fa'
import { TiArrowSortedDown as Down, TiArrowSortedUp as Up } from 'react-icons/ti'

import * as Styled from './Styled.jsx'
import { SORT_DIR, MIN_CELL_WIDTH } from './CONSTS.js'

import ContextMenu from '#src/components/ContextMenu'

// TODO Add docstring:
// cols: Array[{name: string, label: string, sortable: boolean, innerSort: (sortDir) => { ... }[1,0,-1] }]
// rows: Array[{key1: { value: ..., label: string }, ..., keyn: { value: ..., label: string}}]
export default function CollectionTable({
  collectionName,
  cols,
  rows,
  shift,
  keyword = '',
  onContextMenuAction
}) {
  const [selected, setSelected] = useState([])
  const [sortIdx, setSortIdx] = useState(0)
  const [sortDir, setSortDir] = useState(SORT_DIR.asc)

  function rowSort(row1, row2) {
    const col = cols[sortIdx]?.name
    if (row1[col]?.value < row2[col]?.value) return sortDir
    if (row1[col]?.value > row2[col]?.value) return -sortDir
    return 0
  }

  function rowFilter(row) {
    return Object.entries(row)
      .filter(([key, value]) => !key.startsWith('_'))
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
        }
        return value?.label ?? value?.value ?? null
      })
      .some((value) => {
        if (Array.isArray(value)) {
          return value
            .map((item) => item?.label ?? item?.value ?? null)
            .some((value) => value?.includes(keyword))
        } else {
          return value?.includes(keyword)
        }
      })
  }

  function handleColSort(idx) {
    if (idx === sortIdx) {
      setSortDir(-sortDir)
    } else {
      setSortIdx(idx)
      setSortDir(SORT_DIR.asc)
    }
  }

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

  const headerComponent = (
    <Styled.Header.Row className="bg-primary bg-opacity-50">
      {cols.map(({ label, sortable }, idx) => (
        <Styled.Header.Cell key={idx}>
          <div className="d-flex">
            <ContextMenu
              toggle={<ContextMenu.Link $active={idx === sortIdx}>{label}</ContextMenu.Link>}
            >
              <ContextMenu.Item
                label="מיין"
                icon={<Sort />}
                onClick={() => handleColSort(idx)}
                disabled={!sortable}
              />
              <ContextMenu.SubMenu label="סנן" icon={<Filter />}>
                <ContextMenu.Item label="1" />
                <ContextMenu.Item label="2" />
                <ContextMenu.Item label="3" />
              </ContextMenu.SubMenu>
            </ContextMenu>
            <span className="ms-auto">
              {idx === sortIdx && (sortDir === SORT_DIR.asc ? <Up /> : <Down />)}
            </span>
          </div>
        </Styled.Header.Cell>
      ))}
      <Styled.Data.Cell>סטאטוס</Styled.Data.Cell>
    </Styled.Header.Row>
  )

  // NOTE Filter and sort the data, then map into an array
  const rowsComponent = rows
    .filter(rowFilter)
    .sort(cols[sortIdx]?.innerSort ? cols[sortIdx].innerSort(sortDir) : rowSort)
    .map((row, idx) => (
      <ContextMenu
        key={idx}
        toggle={
          <Styled.Data.Row key={idx} className="bg-body">
            {cols.map(({ name }, idx) => (
              <Styled.Data.Cell
                key={idx}
                style={{ minWidth: MIN_CELL_WIDTH }}
                className={
                  idx === sortIdx
                    ? 'bg-primary bg-opacity-10'
                    : keyword.length > 0 &&
                        (row[name]?.label ?? row[name]?.value)?.includes(keyword)
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
        }
      >
        <ContextMenu.Header>{row?.label}</ContextMenu.Header>
        <ContextMenu.SubMenu label="שנה סטאטוס" icon={<Status />}>
          <ContextMenu.Item label="1" />
          <ContextMenu.Item label="2" />
          <ContextMenu.Item label="3" />
        </ContextMenu.SubMenu>
        <ContextMenu.Item
          label="ערוך רשומה"
          icon={<Edit />}
          onClick={() => onContextMenuAction(collectionName, row._id, 'edit')}
        />
        <ContextMenu.Item
          label="מחק רשומה"
          icon={<Delete />}
          onClick={() => onContextMenuAction(collectionName, row._id, 'delete')}
          danger
        />
      </ContextMenu>
    ))

  const nothingFoundComponent = (
    <Row style={{ height: '2.5rem', userSelect: 'none' }}>
      <Col
        className="bg-danger-subtle text-danger text-center"
        style={{ justifyContent: 'center', alignContent: 'center' }}
      >
        לא נמצאו נתונים..
      </Col>
    </Row>
  )

  return (
    <Styled.TableWrapper>
      {headerComponent}
      <Styled.Scrollable className="bg-body-secondary">
        {rowsComponent.length > 0 ? rowsComponent : nothingFoundComponent}
      </Styled.Scrollable>
    </Styled.TableWrapper>
  )
}
