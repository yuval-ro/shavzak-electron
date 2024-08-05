/**
 * @file /src/views/Attendance/Attendance.jsx
 */
import { useState } from 'react'

import Table from './Table'
import { Toolbar, Layout } from '#src/components'

export default function Main({ data, shifts, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  function handleSearchBarChange(keyword) {
    setSearchTerm(keyword)
  }

  // TODO Add context menu for table entries

  return (
    <>
      <Layout.ToolbarContainer>
        <Toolbar onSearchChange={handleSearchBarChange} />
      </Layout.ToolbarContainer>
      <Layout.TabContainer>
        <Table
          shifts={shifts}
          entries={data?.people?.filter(({ serviceNumber, firstName, lastName }) =>
            [serviceNumber, firstName, lastName].some((item) => item && item.includes(searchTerm))
          )}
          onToggle={onChange}
        />
      </Layout.TabContainer>
    </>
  )
}
