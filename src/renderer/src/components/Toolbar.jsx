/**
 * @file /src/components/Toolbar.jsx
 */
import { useEffect } from 'react'
import { ToggleButton, Form, Button, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import {
  MdOutlineViewCarousel,
  MdAccessTime as Time,
  MdNavigateNext as Prev,
  MdNavigateBefore as Next
} from 'react-icons/md'

import { useShiftStore } from '#src/hooks/zustand'

export default function Toolbar({
  tabs,
  activeTab,
  onTabChange,
  onSearchChange,
  onAddButtonClick
}) {
  const shiftStore = useShiftStore()

  return (
    <div style={{ display: 'grid', gridAutoFlow: 'column', gridColumnGap: '1rem' }}>
      <button onClick={() => console.debug(shiftStore)}>Log store</button>
      <InputGroup>
        {/* <InputGroup.Text>
          <Time size="1.5em" />
        </InputGroup.Text> */}
        <Button onClick={() => shiftStore.prev()} variant={'outline-primary'} style={{ flex: '1' }}>
          <Prev size="2rem" />
        </Button>
        <Button disabled variant={'outline-secondary'} style={{ flex: '1' }}>
          0
        </Button>
        <Button onClick={() => shiftStore.next()} variant={'outline-primary'} style={{ flex: '1' }}>
          <Next size="2rem" />
        </Button>
      </InputGroup>
      {onTabChange && (
        <InputGroup style={{ width: '20rem' }}>
          <InputGroup.Text>
            <MdOutlineViewCarousel size="1.5em" />
          </InputGroup.Text>
          {Object.entries(tabs).map(([name, { title }], idx) => (
            <ToggleButton
              key={idx}
              variant={activeTab === name ? 'primary' : 'outline-primary'}
              onClick={() => onTabChange(name)}
              style={{ flex: '1' }}
            >
              {title}
            </ToggleButton>
          ))}
        </InputGroup>
      )}
      {onSearchChange && (
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="חיפוש..."
            onChange={(event) => onSearchChange(event?.target?.value)}
            style={{ flex: 1, marginLeft: onAddButtonClick ? '1rem' : '' }}
          />
        </InputGroup>
      )}
      {onAddButtonClick && (
        <Button
          variant="outline-primary"
          onClick={onAddButtonClick}
          style={{ minWidth: '6rem' }}
          className="ms-auto"
        >
          הוסף
        </Button>
      )}
    </div>
  )
}
