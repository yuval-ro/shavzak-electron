// Table.jsx
import { useState } from 'react'

import Context from './Context'
import Styled from './styled'
import { SORT_DIRECTION } from './CONSTS'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import TableControl from './TableControl'

export default function Table({ cols, rows, shift }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({
    idx: 0,
    direction: SORT_DIRECTION.asc
  })
  const [filters, setFilters] = useState([])
  const [filterType, setFilterType] = useState('or')
  const filteredRows = rows
    ?.filter((row) =>
      Object.entries(row)
        ?.filter(([key, value]) => !key?.startsWith('_'))
        ?.map(([key, value]) => {
          return Array.isArray(value) ? value : value?.label ?? value?.value
        })
        ?.some((value) => {
          return Array.isArray(value)
            ? value
                ?.map(({ label, value }) => label ?? value)
                ?.some((repr) => repr?.includes(search))
            : value?.includes(search)
        })
    )
    ?.filter((row) => {
      if (filters.length < 1) {
        return true
      }
      switch (filterType) {
        case 'and': {
          return filters
            .map(({ value }) => value)
            .every((filterValue) =>
              Object.values(row)?.some((rowValue) => {
                if (Array.isArray(rowValue)) {
                  return rowValue.some(({ value }) => value === filterValue)
                } else {
                  return rowValue.value === filterValue
                }
              })
            )
        }
        case 'or': {
          return filters
            .map(({ value }) => value)
            .some((filterValue) =>
              Object.values(row)?.some((rowValue) => {
                if (Array.isArray(rowValue)) {
                  return rowValue.some(({ value }) => value === filterValue)
                } else {
                  return rowValue.value === filterValue
                }
              })
            )
        }
        default: {
          throw new Error(`Unexpected 'filterType' value: ${JSON.stringify(filterType)}`)
        }
      }
    })

  function handleSortToggle(newIdx) {
    setSort((prev) => ({
      idx: newIdx,
      direction: newIdx === sort?.idx ? -prev?.direction : SORT_DIRECTION.asc
    }))
  }

  function handleSearchChange(keyword) {
    setSearch(keyword)
  }

  function handleFilterChange(selected) {
    console.debug(selected)
    setFilters(selected)
  }

  function handleFilterTypeChange(selected) {
    setFilterType(selected)
  }

  const renderTableRows = () => {
    if (filteredRows.length > 0) {
      return filteredRows
        ?.sort((row1, row2) => {
          const { idx, direction } = sort
          const key = cols[idx]?.name
          if (row1[key]?.value < row2[key]?.value) return direction
          if (row1[key]?.value > row2[key]?.value) return -direction
          return 0
        })
        ?.map((row, idx) => <TableRow key={idx} rowData={row} />)
    } else {
      return (
        <div
          className="fs-1 text-body-tertiary"
          style={{ padding: '3rem', userSelect: 'none', textAlign: 'center' }}
        >
          לא נמצאו נתונים
        </div>
      )
    }
  }

  return (
    <Context.Provider value={{ shift, cols, sort, search, filters, filteredRows }}>
      <TableControl
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onFilterTypeChange={handleFilterTypeChange}
      />
      <TableHeader onSortToggle={handleSortToggle} />
      <Styled.Scrollable className="bg-body-secondary">{renderTableRows()}</Styled.Scrollable>
    </Context.Provider>
  )
}
