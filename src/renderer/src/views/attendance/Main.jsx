import { useState } from 'react'

import Table from './Table'
import Toolbar from '#src/components/Toolbar.jsx'
import { TabContainer, ToolbarContainer } from '#src/components/styled.jsx'

export default function Main({ data, shifts, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  function handleSearchBarChange(keyword) {
    setSearchTerm(keyword)
  }

  // TODO Add context menu for table entries

  return (
    <>
      <ToolbarContainer>
        <Toolbar onSearchChange={handleSearchBarChange} />
      </ToolbarContainer>
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
