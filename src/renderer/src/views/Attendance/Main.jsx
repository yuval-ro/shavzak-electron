import { useState } from 'react'

import Table from './Table'
import SearchBar from './SearchBar'
import labels from '#src/labels.json'

export default function Main({ data, shifts, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSearchBarChange(keyword) {
    setSearchTerm(keyword)
  }

  function filterPeople(people) {
    var result = people
    if (searchTerm !== '') {
      result = result.filter(({ service_number, first_name, last_name }) =>
        [service_number, first_name, last_name].some((item) => item && item.includes(searchTerm))
      )
    }
    return result
  }

  const tableStyle = {
    border: '1px solid lightgray',
    borderRadius: '8px',
    marginTop: '10px'
  }

  return (
    <>
      <SearchBar
        onSearchChange={handleSearchBarChange}
        onAddClick={(values) => handleAddButtonClick('people', values)}
        style={{ marginTop: '15px' }}
      />
      <Table
        shifts={shifts}
        data={filterPeople(data?.people)}
        style={tableStyle}
        labels={labels.person}
        sortFn={(a, b) => {
          if (a.affiliation < b.affiliation) return -1
          if (a.affiliation > b.affiliation) return 1
          if (
            a.service_type === 'officer' &&
            (b.service_type === 'enlisted' || b.service_type === 'nco')
          )
            return -1
          if (
            b.service_type === 'officer' &&
            (a.service_type === 'enlisted' || a.service_type === 'nco')
          )
            return 1
          if (a.service_type === 'nco' && b.service_type === 'enlisted') return -1
          if (b.service_type === 'nco' && a.service_type === 'enlisted') return 1
          if (a.active_role === 'platoon_sergeant' && b.active_role === 'trooper') return -1
          if (b.active_role === 'platoon_sergeant' && a.active_role === 'trooper') return 1
          if (a.rank < b.rank) return 1
          if (a.rank > b.rank) return -1
          return a.first_name.localeCompare(b.first_name)
        }}
        onToggle={onChange}
      />
    </>
  )
}
