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
  const defaults = {
    player: '',
    name: '',
    speed: '',
    dex: '',
    hp: '',
    stun: '',
    active: '',
    npc: '',
  }
  const [passedData, setPassedData] = useState(null)
  const [formData, setFormData] = useState(defaults)

  useEffect(() => {
    if (data) {
      setPassedData(data)
      setFormData(data.doc)
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

      { Object.keys(defaults).map(fn => (
        <FormGroup key={fn}>
          <label htmlFor={fn}>{fn}</label>
          <input type="text" name={fn} value={formData[fn]} onChange={handleChange} />
        </FormGroup>
      ))}

      <FormGroup>
        <button onClick={handleSubmit}>submit</button>
      </FormGroup>
    </StyledCharacterForm>
  )
}
