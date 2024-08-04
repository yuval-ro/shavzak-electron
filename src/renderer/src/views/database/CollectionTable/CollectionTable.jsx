/**
 * @file /src/views/components/CollectionTable/CollectionTable.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
  FaSort,
  FaFilter,
  FaEdit,
  FaTrash,
  FaSortAlphaDown as Down,
  FaSortAlphaUpAlt as Up
} from 'react-icons/fa'

import * as Styled from './Styled.jsx'
import { SORT_DIR } from './CONSTS.js'

import ContextMenu from '#src/components/ContextMenu'

// TODO Add docstring:
// cols: Array[{name: string, label: string, sortable: boolean, innerSort: (sortDir) => { ... }[1,0,-1] }]
// rows: Array[{key1: { value: ..., label: string }, ..., keyn: { value: ..., label: string}}]
export default function CollectionTable({ name, cols, rows, keyword = '', contextMenu }) {
  const [sortIdx, setSortIdx] = useState(0)
  const [sortDir, setSortDir] = useState(SORT_DIR.asc)

  function rowSort(row1, row2) {
    const col = cols[sortIdx]?.name
    if (row1[col].value < row2[col].value) return sortDir
    if (row1[col].value > row2[col].value) return -sortDir
    return 0
  }

  function rowFilter(row) {
    return (
      Object.entries(row)
        .filter(([key, value]) => !key.startsWith('_'))
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value
          }
          return value?.label ?? value?.value ?? null
        })
        // .filter((value) => value !== null)
        .some((value) => {
          if (Array.isArray(value)) {
            return (
              value
                .map((item) => item?.label ?? item?.value ?? null)
                // .filter((value) => value !== null)
                .some((value) => value.includes(keyword))
            )
          } else {
            return value.includes(keyword)
          }
        })
    )
  }

  function handleColSort(idx) {
    if (idx === sortIdx) {
      setSortDir(-sortDir)
    } else {
      setSortIdx(idx)
      setSortDir(SORT_DIR.asc)
    }
  }

  return (
    <>
      {/* HEADER ROW */}
      <Styled.Row className="bg-primary-subtle">
        <Styled.HeaderCell style={{ maxWidth: '3rem' }}>
          {sortDir === SORT_DIR.asc ? <Up size="1.5rem" /> : <Down size="1.5rem" />}
        </Styled.HeaderCell>
        {cols.map(({ label, sortable }, idx) => (
          <Styled.HeaderCell key={idx}>
            <ContextMenu
              toggle={<Styled.ColName $active={idx === sortIdx}>{label}</Styled.ColName>}
            >
              <ContextMenu.Item
                label="מיין"
                icon={<FaSort />}
                onClick={() => handleColSort(idx)}
                disabled={sortable}
              />
              <ContextMenu.SubMenu label="סנן" icon={<FaFilter />}>
                <ContextMenu.Item label="1" />
                <ContextMenu.Item label="2" />
                <ContextMenu.Item label="3" />
              </ContextMenu.SubMenu>
            </ContextMenu>
          </Styled.HeaderCell>
        ))}
      </Styled.Row>
      {/* DATA ROWS */}
      <Styled.Scrollable className="bg-body-secondary">
        {rows?.length > 0 ? (
          rows
            .filter(rowFilter)
            .sort(cols[sortIdx]?.innerSort ? cols[sortIdx].innerSort(sortDir) : rowSort)
            .map((row, idx) => {
              const rowComponent = (
                <Styled.DataRow key={idx} className="bg-body">
                  <Styled.DataCell style={{ maxWidth: '3rem' }}>{idx + 1}</Styled.DataCell>
                  {cols.map(({ name }, idx) => (
                    <Styled.DataCell key={idx}>
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
        ) : (
          <Row className="bg-body-tertiary" style={{ height: '2.5rem', cursor: 'auto' }}>
            <Col>לא נמצאו נתונים...</Col>
          </Row>
        )}
      </Styled.Scrollable>
    </>
  )
}
