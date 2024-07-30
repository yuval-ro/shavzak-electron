import { useState } from 'react'

import Table from './Table'
import SearchBar from './SearchBar'

export default function Main({ data, shifts, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  function handleSearchBarChange(keyword) {
    setSearchTerm(keyword)
  }

  const tableStyle = {
    border: '1px solid lightgray',
    borderRadius: '8px',
    marginTop: '10px'
  }

  // TODO Add context menu for table entries

  return (
    <>
      <SearchBar onSearchChange={handleSearchBarChange} style={{ marginTop: '15px' }} />
      <Table
        shifts={shifts}
        entries={data?.people?.filter(({ serviceNumber, firstName, lastName }) =>
          [serviceNumber, firstName, lastName].some((item) => item && item.includes(searchTerm))
        )}
        style={tableStyle}
        onToggle={onChange}
      />
    </>
  )
}
