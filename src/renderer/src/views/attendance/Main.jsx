import { useState } from 'react'

import Table from './Table'
import SearchBar from './SearchBar'

import TabContainer from '#src/components/TabContainer.jsx'

export default function Main({ data, shifts, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  function handleSearchBarChange(keyword) {
    setSearchTerm(keyword)
  }

  // TODO Add context menu for table entries

  return (
    <>
      <SearchBar onSearchChange={handleSearchBarChange} style={{ marginTop: '15px' }} />
      <TabContainer>
        <Table
          shifts={shifts}
          entries={data?.people?.filter(({ serviceNumber, firstName, lastName }) =>
            [serviceNumber, firstName, lastName].some((item) => item && item.includes(searchTerm))
          )}
          onToggle={onChange}
        />
      </TabContainer>
    </>
  )
}
