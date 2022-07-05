import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import gmdocService from '../../features/gmdoc/gmdocService'
import { TestWrapper } from "./TestWrapper"

const FormGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`

export const TestCreateGmdoc = () => {
  const defaults = { type: '', doc: '' }
  const [formData, setFormData] = useState(defaults)
  const { user: loggedUser } = useSelector((state) => state.auth)

  const handleChange = (event) => {
    const newData = {
      ...formData,
      [event.target.name]: event.target.value,
    }
    setFormData(newData)
  }

  const handleSubmit = () => {
    console.log({formData})
    const data = {
      ...formData,
      gmId: loggedUser._id
    }
    console.log({data})
    gmdocService.createGmdoc(data, loggedUser.token)
  }

  return (
    <TestWrapper
      title="create gmdoc"
    >
      <FormGroup>
        create gmdoc
      </FormGroup>

      <FormGroup>
        <label htmlFor='type'>type</label>
        <input type="text" name="type" onChange={handleChange} />
      </FormGroup>

      <FormGroup>
        <label htmlFor='type'>doc</label>
        <textarea type="text" name="doc" onChange={handleChange} rows="15" cols="50" />
      </FormGroup>

      <FormGroup>
        <button onClick={handleSubmit}>submit</button>
      </FormGroup>
    </TestWrapper>
  )
}
