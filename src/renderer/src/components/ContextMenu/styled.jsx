// Styled.jsx
import styled, { css } from 'styled-components'
// import { FormCheck } from "react-bootstrap";
import chroma from 'chroma-js'

const VARIANTS = Object.freeze({
  success: 'success',
  danger: 'danger'
})

export const Menu = styled.div`
  user-select: none;
  padding: 0;
  border-radius: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`

export const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: ${({ $variant }) => {
    switch ($variant) {
      case VARIANTS.danger:
        return chroma('red').darken(1).css()
      default:
        return chroma('black').css()
    }
  }} !important;
  ${(props) =>
    !props.$static &&
    css`
      &:hover {
        background-color: ${({ $variant }) => {
          switch ($variant) {
            case VARIANTS.danger:
              return chroma('red').alpha(0.15).css()
            default:
              return chroma('gray').alpha(0.1).css()
          }
        }}
    `};
`

export const Link = styled.span`
  position: relative;
  user-select: none;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$disabled ? 'gray' : 'black')};
  &:hover {
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
    text-decoration: underline;
  }
`

export const SubMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover > ${Menu} {
    display: block;
  }
`
