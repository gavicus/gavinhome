import { useState } from 'react'
import { useSelector } from 'react-redux'

import gmdocService from '../../features/gmdoc/gmdocService'
import { TestWrapper } from "./TestWrapper"

export const TestGetGmdoc = () => {
  const [gmdocId, setGmdocId] = useState(null)
  const { user: loggedUser } = useSelector((state) => state.auth)

  const getTheGmdoc = async() => {
    const reply = await gmdocService.getGmdoc(gmdocId, loggedUser.token);
    if (!reply) { return }
    console.log('reply',reply)
  }

  const handleChangeGmdocid = (event) => {
    setGmdocId(event.target.value)
  }

  const handleSubmit = () => {
    console.log('handleSubmit',gmdocId)
    getTheGmdoc()
  }

  return (
    <TestWrapper title="get gmdoc">
      <label htmlFor='gmdocid'>gmdoc id</label>
      <input type="text" name="gmdocid" onChange={handleChangeGmdocid} />
      <button onClick={handleSubmit}>submit</button>
    </TestWrapper>
  )
}
