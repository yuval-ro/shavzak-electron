import { useContext } from 'react'
import { InputGroup, Form, Stack } from 'react-bootstrap'
import { Funnel as Filter, Search } from 'react-bootstrap-icons'
import Select from 'react-select'

import TableContext from './Context'
import Styled from './styled'

export default function TableControl({ onSearchChange, onFilterChange, onFilterTypeChange }) {
  const { cols, filteredRows } = useContext(TableContext)
  const filterTypeOptions = [
    { value: 'or', label: 'או' },
    { value: 'and', label: 'וגם' }
  ]
  return (
    <Stack direction="horizontal" gap="2" className="d-flex p-1 pb-2">
      <Styled.InputGroup $width="50%">
        <InputGroup.Text>
          <Filter />
        </InputGroup.Text>
        <div style={{ maxWidth: '20%', flexGrow: 1 }}>
          <Select
            options={filterTypeOptions}
            defaultValue={filterTypeOptions[0]}
            onChange={(selected) => onFilterTypeChange(selected?.value)}
          />
        </div>
        <Styled.SelectWrapper>
          <Select
            isMulti
            isClearable
            placeholder="סננים"
            options={cols
              ?.filter((col) => col?.options)
              ?.map((col) => {
                return {
                  label: col?.label,
                  options: Object.entries(col?.options).map(([key, value]) => ({
                    value: key,
                    label: value
                  }))
                }
              })}
            onChange={(selected) => onFilterChange(selected)}
          />
        </Styled.SelectWrapper>
      </Styled.InputGroup>
      <div className="d-flex flex-grow-1">
        <InputGroup className="flex-grow-1">
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="טקסט חופשי"
            onChange={(event) => onSearchChange(event?.target?.value)}
          />
        </InputGroup>
        <Stack direction="horizontal" className="ps-1 flex-shrink-1 text-nowrap">
          {'תוצאות: ' + filteredRows?.length}
        </Stack>
      </div>
    </Stack>
  )
}
