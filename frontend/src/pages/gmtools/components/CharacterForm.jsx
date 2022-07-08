import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledCharacterForm = styled.div`
  border: 1px solid gray;
  padding: 10px;
  width: shrink;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`

export const CharacterForm = ({data, onSubmit}) => {
  const fieldNames = ['player','name','speed','dex','hp','stun']
  const defaults = fieldNames.reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: ''
    }
  }, {})
  const [formData, setFormData] = useState(defaults)

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleChange = (event) => {
    const newData = {
      ...formData,
      [event.target.name]: event.target.value
    }
    setFormData(newData)
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData(defaults)
  }

  return (
    <StyledCharacterForm>
      <p>character</p>

      { fieldNames.map(fn => (
        <FormGroup key={fn}>
          <label htmlFor={fn}>{fn}</label>
          <input name={fn} value={formData[fn]} onChange={handleChange} />
        </FormGroup>
      ))}

      <FormGroup>
        <button onClick={handleSubmit}>submit</button>
      </FormGroup>
    </StyledCharacterForm>
  )
}
