import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import dataService from '../../features/data/dataService'
import { TestWrapper } from "./TestWrapper"

const FormGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`

export const TestCreateData = () => {
  const defaults = { project: '', type: '', doc: '' }
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
      userId: loggedUser._id
    }
    console.log({data})
    dataService.createData(data, loggedUser.token)
  }

  return (
    <TestWrapper title="create data">
      <FormGroup>create data</FormGroup>

      <FormGroup>
        <label htmlFor='project'>project</label>
        <input type="text" name="project" onChange={handleChange} />
      </FormGroup>

      <FormGroup>
        <label htmlFor='type'>type</label>
        <input type="text" name="type" onChange={handleChange} />
      </FormGroup>

      <FormGroup>
        <label htmlFor='doc'>doc</label>
        <textarea name="doc" onChange={handleChange} />
      </FormGroup>

      <FormGroup>
        <button onClick={handleSubmit}>submit</button>
      </FormGroup>

    </TestWrapper>
  )
}
