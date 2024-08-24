/**
 * @file /src/views/components/CollectionTable/CollectionTable.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
  SortDown as Sort,
  FunnelFill as Filter,
  CaretUpFill as Up,
  CaretDownFill as Down
} from 'react-bootstrap-icons'

import Context from './Context'
import * as Styled from './styles'
import { SORT_DIR } from './CONSTS'
import CollectionTableRow from './CollectionTableRow'

export default function CollectionTable({ cols, rows, shift, keyword = '' }) {
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

  const headerRow = (
    <Styled.Header.Row className="bg-primary bg-opacity-50">
      {cols.map(({ label, sortable }, idx) => (
        <Styled.Header.Cell key={idx}>
          <div className="d-flex">
            {label}
            {/* <Dropdown
              toggle={<ContextMenu.Link active={idx === sortIdx}>{label}</ContextMenu.Link>}
            >
              <ContextMenu.ActionItem
                label="מיין"
                icon={<Sort />}
                onClick={() => handleColSort(idx)}
                disabled={!sortable}
              />
              <ContextMenu.SubMenu label="סנן" icon={<Filter />}>
                <ContextMenu.CheckItem label="1" />
                <ContextMenu.CheckItem label="2" />
                <ContextMenu.CheckItem label="3" />
              </ContextMenu.SubMenu>
            </ContextMenu> */}
            <span className="ms-auto">
              {idx === sortIdx && (sortDir === SORT_DIR.asc ? <Up /> : <Down />)}
            </span>
          </div>
        </Styled.Header.Cell>
      ))}
      <Styled.Data.Cell>סטאטוס</Styled.Data.Cell>
    </Styled.Header.Row>
  )

  const dataRows = rows
    .filter(rowFilter)
    .sort(cols[sortIdx]?.innerSort ? cols[sortIdx].innerSort(sortDir) : rowSort)
    .map((row, idx) => <CollectionTableRow key={idx} row={row} />)

  const nothingFound = (
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
    <Context.Provider value={{ shift, cols, sortIdx, sortDir, keyword }}>
      <Styled.TableWrapper>
        {headerRow}
        <Styled.Scrollable className="bg-body-secondary">
          {dataRows.length > 0 ? dataRows : nothingFound}
        </Styled.Scrollable>
      </Styled.TableWrapper>
    </Context.Provider>
  )
}
