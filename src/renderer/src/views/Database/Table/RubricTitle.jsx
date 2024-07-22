import styled from 'styled-components'

const Title = styled.span`
  text-decoration: none; /* Remove default underline */
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  user-select: none;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ disabled }) => (disabled ? 'gray' : 'black')};

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: black;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
  }

  ${({ disabled }) =>
    !disabled &&
    `
    &:hover::after {
      transform: scaleX(1);
    }
  `}
`

const RubricTitle = ({ title, active, sortType, onClick, disabled = false }) => (
  <Title onClick={disabled ? null : onClick} active={active} disabled={disabled}>
    {title}
    {!disabled && active && (sortType === 'ascending' ? ' ▲' : ' ▼')}
  </Title>
)

export default RubricTitle
