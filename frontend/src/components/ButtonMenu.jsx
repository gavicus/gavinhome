import styled from 'styled-components'

const StyledRow = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const StyledButton = styled.button`
  padding: 5px;
`

export const ButtonMenu = ({options, onClick}) => {
  const handleClick = (opt) => {
    onClick(opt)
  }

  return (
    <StyledRow>
    {
      options.map(o => (
        <StyledButton key={o} onClick={() => handleClick(o)}>{o}</StyledButton>
      ))
    }
    </StyledRow>
  )
}