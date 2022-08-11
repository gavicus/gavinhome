import styled from 'styled-components'

const StyledRow = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const StyledButton = styled.button`
  padding: 5px;
  background: ${props => props.current ? "white" : "lightgray"};
  font-weight: ${props => props.current ? "bold" : "normal"};
  border-radius: 10px;
  border: 2px solid gray;
  cursor: pointer;
`

export const ButtonMenu = ({options, onClick, current}) => {
  const handleClick = (opt) => {
    onClick(opt)
  }

  return (
    <StyledRow>
    {
      options.map(o => (
        <StyledButton
          current={current === o}
          key={o}
          onClick={() => handleClick(o)}
        >
          {o}
        </StyledButton>
      ))
    }
    </StyledRow>
  )
}