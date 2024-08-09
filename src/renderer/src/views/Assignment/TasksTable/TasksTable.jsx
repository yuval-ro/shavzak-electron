/**
 * @file /src/views/assignment/TasksTable/TasksTable.jsx
 */
import { FaEdit, FaTrash } from 'react-icons/fa'
import Select from 'react-select'

import ContextMenu from '#src/components/ContextMenu'
import { PersonSchema, CampTaskSchema } from '#src/schemas'
import Sortable from './Sortable.jsx'
import * as Styled from './Styled.jsx'

export default function TasksTable({ cols, rows, people, onReorder, onContextMenuAction }) {
  return (
    <>
      {/* HEADER ROW */}
      <Styled.Header.Row>
        {cols.map((col, idx) => (
          <Styled.Header.Cell xs={2} key={idx}>
            {CampTaskSchema?.props[col]?.label}
          </Styled.Header.Cell>
        ))}
        <Styled.Header.Cell>איוש</Styled.Header.Cell>
      </Styled.Header.Row>
      {/* DATA ROWS */}
      <Sortable.Wrapper
        pressDelay={1000}
        lockToContainerEdges
        lockOffset={['0%', '0%']}
        lockAxis="y"
        onSortEnd={onReorder}
      >
        {rows
          .sort((a, b) => a?.idx - b?.idx)
          .map((row, idx) => (
            <Sortable.Row key={idx} index={idx} rowIdx={idx}>
              {/* TASK DATA */}
              {cols.map((col, idx) => (
                <Styled.Data.Cell xs={2} key={idx}>
                  {(() => {
                    switch (col) {
                      case 'name':
                        return (
                          <ContextMenu
                            key={idx}
                            toggle={<ContextMenu.Link>{row[col]}</ContextMenu.Link>}
                          >
                            <ContextMenu.Item
                              label="ערוך"
                              icon={<FaEdit />}
                              onClick={() => onContextMenuAction(row?._id, 'edit')}
                            />
                            <ContextMenu.Item
                              label="מחק"
                              icon={<FaTrash />}
                              onClick={() => onContextMenuAction(row?._id, 'delete')}
                            />
                          </ContextMenu>
                        )
                      default:
                        return new Date(row?.[col])?.toLocaleTimeString('he-IL', {
                          hour: 'numeric',
                          minute: 'numeric'
                        })
                    }
                  })()}
                </Styled.Data.Cell>
              ))}
              {/* SELECT PERSON */}
              <Styled.Data.Cell>
                <Select
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  placeholder=""
                  options={people.map((person) => ({
                    value: person._id,
                    label: PersonSchema.stringify(person)
                  }))}
                  // onChange={(selectedOption) =>
                  //   onSelectChange(taskName, shift._id, selectedOption)
                  // }
                  isSearchable={false}
                  isMulti={true}
                  isClearable={true}
                  hideSelectedOptions={true}
                  components={{
                    MultiValueContainer: ({ children }) => (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
                    ),
                    MultiValue: ({ children }) => (
                      <div
                        style={{
                          width: '100%',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {children}
                      </div>
                    )
                  }}
                  styles={
                    {
                      // multiValue: (base) => ({
                      //   ...base,
                      //   backgroundColor: '#cfe2ff',
                      //   border: '1px solid lightgray',
                      //   // flexGrow: 1,
                      //   // justifyContent: 'space-between'
                      // })
                    }
                  }
                />
              </Styled.Data.Cell>
            </Sortable.Row>
          ))}
      </Sortable.Wrapper>
    </>
  )
}
