/**
 * @file /src/views/components/CollectionTable/CollectionTable.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaSort, FaFilter, FaEdit, FaTrash } from 'react-icons/fa'
import { TiArrowSortedDown as Down, TiArrowSortedUp as Up } from 'react-icons/ti'

import * as Styled from './Styled.jsx'
import { SORT_DIR, MIN_CELL_WIDTH } from './CONSTS.js'

import ContextMenu from '#src/components/ContextMenu'

// TODO Add docstring:
// cols: Array[{name: string, label: string, sortable: boolean, innerSort: (sortDir) => { ... }[1,0,-1] }]
// rows: Array[{key1: { value: ..., label: string }, ..., keyn: { value: ..., label: string}}]
export default function CollectionTable({ name, cols, rows, keyword = '', contextMenu }) {
  const [sortIdx, setSortIdx] = useState(0)
  const [sortDir, setSortDir] = useState(SORT_DIR.asc)

  function rowSort(row1, row2) {
    const col = cols[sortIdx]?.name
    if (row1[col]?.value < row2[col]?.value) return -sortDir
    if (row1[col]?.value > row2[col]?.value) return sortDir
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

  // NOTE Filter and sort the data, then map into an array
  const rowsComponent = rows
    .filter(rowFilter)
    .sort(cols[sortIdx]?.innerSort ? cols[sortIdx].innerSort(sortDir) : rowSort)
    .map((row, idx) => {
      const rowComponent = (
        <Styled.DataRow key={idx} className="bg-body">
          {cols.map(({ name }, idx) => (
            <Styled.DataCell
              key={idx}
              style={{ minWidth: MIN_CELL_WIDTH }}
              className={idx === sortIdx ? 'bg-primary bg-opacity-10' : ''}
            >
              {row[name]
                ? Array.isArray(row[name])
                  ? row[name].map((item) => item?.label ?? item.value).join(', ')
                  : row[name]?.label ?? row[name].value
                : null}
            </Styled.DataCell>
          ))}
        </Styled.DataRow>
      )
      if (contextMenu) {
        return (
          <ContextMenu key={idx} toggle={rowComponent}>
            <ContextMenu.Header>{row?.label}</ContextMenu.Header>
            <ContextMenu.Item
              label="ערוך"
              icon={<FaEdit />}
              onClick={() => contextMenu.handleAction(name, row._id, 'edit')}
            />
            <ContextMenu.Item
              label="מחק"
              icon={<FaTrash />}
              onClick={() => contextMenu.handleAction(name, row._id, 'delete')}
            />
          </ContextMenu>
        )
      } else {
        return rowComponent
      }
    })

  return (
    <Styled.TableWrapper>
      {/* HEADER ROW */}
      <Styled.HeaderRow className="bg-primary bg-opacity-50">
        {cols.map(({ label, sortable }, idx) => (
          <Styled.HeaderCell key={idx}>
            <div className="d-flex">
              <ContextMenu
                toggle={<ContextMenu.Link $active={idx === sortIdx}>{label}</ContextMenu.Link>}
              >
                <ContextMenu.Item
                  label="מיין"
                  icon={<FaSort />}
                  onClick={() => handleColSort(idx)}
                  disabled={!sortable}
                />
                <ContextMenu.SubMenu label="סנן" icon={<FaFilter />}>
                  <ContextMenu.Item label="1" />
                  <ContextMenu.Item label="2" />
                  <ContextMenu.Item label="3" />
                </ContextMenu.SubMenu>
              </ContextMenu>
              <span className="ms-auto">
                {idx === sortIdx && (sortDir === SORT_DIR.asc ? <Up /> : <Down />)}
              </span>
            </div>
          </Styled.HeaderCell>
        ))}
      </Styled.HeaderRow>
      {/* DATA ROWS */}
      <Styled.Scrollable className="bg-body-secondary">
        {rowsComponent.length > 0 ? (
          rowsComponent
        ) : (
          <Row className="bg-body-tertiary" style={{ height: '2.5rem', cursor: 'auto' }}>
            <Col>לא נמצאו נתונים...</Col>
          </Row>
        )}
      </Styled.Scrollable>
    </Styled.TableWrapper>
  )
}
