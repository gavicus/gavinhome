import { useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.div`
  border: 1px solid gray;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
`

const StyledElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledSubmitButton = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 5px;
`

export const CampaignForm = ({onSubmit}) => {
  const defaults = {
    title: '',
    system: '',
    description: '',
  }
  const [data, setData] = useState(defaults)

  const handleChange = (event) => {
    const newData = {
      ...data,
      [event.target.name]: event.target.value
    }
    setData(newData)
  }

  const handleSubmit = () => {
    onSubmit(data)
  }

  return (
    <StyledForm>
      <p>campaign</p>
      {
        Object.keys(defaults).map(k => (
          <StyledElement key={k}>
            <label htmlFor={k}>{k}</label>
            <input name={k} onChange={handleChange} />
          </StyledElement>
        ))
      }
      <StyledSubmitButton onClick={handleSubmit}>submit</StyledSubmitButton>
    </StyledForm>
  )
}
