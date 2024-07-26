import { Row, Col, Dropdown } from "react-bootstrap"
import { IoDiceSharp } from "react-icons/io5"
import { RiLock2Fill } from "react-icons/ri"
import { GiBroom } from "react-icons/gi"
import styled from "styled-components"

const StyledDropdownItem = styled(Dropdown.Item)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default function ControlRow({ shifts, startIdx, length, onClearButtonClick }) {
    return (
        <Row>
            <Col xs={1}></Col>
            {shifts.length < 1
                ? null
                : shifts.slice(startIdx, startIdx + length).map((shift, idx) => (
                      <Col key={idx}>
                          <Dropdown>
                              <Dropdown.Toggle
                                  className="w-100"
                                  variant="outline-primary"
                                  style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                  }}
                              >
                                  Actions
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="w-100">
                                  <StyledDropdownItem>
                                      <text className="ms-2">Lock</text>
                                      <RiLock2Fill />
                                  </StyledDropdownItem>
                                  <StyledDropdownItem>
                                      <text className="ms-2">Randomize</text>
                                      <IoDiceSharp />
                                  </StyledDropdownItem>
                                  <StyledDropdownItem
                                      onClick={() => onClearButtonClick(startIdx + idx)}
                                  >
                                      <text className="ms-2">Clear</text>
                                      <GiBroom />
                                  </StyledDropdownItem>
                              </Dropdown.Menu>
                          </Dropdown>
                      </Col>
                  ))}
        </Row>
    )
}
