// TableHeader.jsx
import { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { CaretUpFill as Up, CaretDownFill as Down } from 'react-bootstrap-icons'

import { SORT_DIRECTION } from './CONSTS'
import TableContext from './Context'
import Styled from './styled'

export default function TableHeader({ onSortToggle }) {
  const { cols, sort } = useContext(TableContext)

  return (
    <Styled.Header.Row className="bg-primary bg-opacity-50 pe-3">
      {cols.map((col, idx) => (
        <Styled.Header.Cell key={idx}>
          <Stack direction="horizontal">
            {col?.sortable ? (
              <>
                <a
                  className={
                    col?.sortable
                      ? 'link-dark link-underline-opacity-0 link-underline-opacity-75-hover'
                      : 'link-dark link-underline-opacity-0 disabled'
                  }
                  href="#"
                  onClick={() => onSortToggle(idx)}
                >
                  {col?.label}
                </a>
                <div className="ms-auto">
                  {idx === sort?.idx &&
                    (sort?.direction === SORT_DIRECTION.asc ? (
                      <Up size="0.8rem" />
                    ) : (
                      <Down size="0.8rem" />
                    ))}
                </div>
              </>
            ) : (
              <span className="text-secondary">{col?.label}</span>
            )}
          </Stack>
        </Styled.Header.Cell>
      ))}
    </Styled.Header.Row>
  )
}
