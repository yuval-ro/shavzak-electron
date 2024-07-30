import styled from 'styled-components'

const Title = styled.span`
  text-decoration: none; /* Remove default underline */
  position: relative;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  user-select: none;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$disabled ? 'gray' : 'black')};

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

  ${(props) =>
    props.$disabled &&
    `
    &:hover::after {
      transform: scaleX(1);
    }
  `}
`

const RubricTitle = ({ title, active, sortType, onClick, disabled }) => (
  <Title onClick={onClick} $active={active} $disabled={disabled}>
    {title}
    {active && (sortType === 'ascending' ? ' ▲' : ' ▼')}
  </Title>
)

export default RubricTitle
