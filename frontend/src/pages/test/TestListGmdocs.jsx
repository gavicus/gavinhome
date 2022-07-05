import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import gmdocService from '../../features/gmdoc/gmdocService'
import { TestWrapper } from "./TestWrapper"

const StyledListing = styled.div`
  border: 1px solid gray;
  margin-bottom: 10px;
  cursor: pointer;
`

export const TestListGmdocs = () => {
  const [gmdocs, setGmdocs] = useState([])
  const [selectedGmdoc, setSelectedGmdoc] = useState(null)
  const { user: loggedUser } = useSelector((state) => state.auth)

  const handleGetList = () => {
    gmdocService.listGmdocs(loggedUser._id, loggedUser.token)
    .then((docs)=>{
      setGmdocs(docs)
      setSelectedGmdoc(null)
    })
  }

  const handleClickListing = (docId) => {
    gmdocService.getGmdoc(docId, loggedUser.token)
    .then(reply => 
      setSelectedGmdoc(reply)
    )
  }

  const handleUpdate = () => {
    gmdocService.updateGmdoc(selectedGmdoc, loggedUser.token)
    .then((response) => {
      console.log({response})
      window.alert('done')
    })
  }

  const handleDocChange = (event) => {
    const newDoc = {
      ...selectedGmdoc,
      doc: event.target.value
    }
    setSelectedGmdoc(newDoc)
  }

  const handleDeleteButton = () => {
    if (window.confirm('delete this doc?')) {
      gmdocService.deleteGmdoc(selectedGmdoc._id, loggedUser.token)
    }
  }

  const DocListing = ({doc}) => {
    return (
      <StyledListing onClick={() => handleClickListing(doc._id)}>
        <div>id: {doc._id}</div>
        <div>gmid: {doc.gmId}</div>
        <div>type: {doc.type}</div>
        <div>doc: {JSON.stringify(doc.doc)}</div>
      </StyledListing>
    )
  }

  return (
    <TestWrapper title="list gmdocs">
      <button onClick={handleGetList}>get the docs</button>
      {
        selectedGmdoc ?
        <>
          <div>doc id: {selectedGmdoc._id}</div>
          <div>type: {selectedGmdoc.type}</div>
          <div>
            <textarea
              name="docText"
              cols="70"
              rows="5"
              value={selectedGmdoc.doc}
              onChange={handleDocChange}
            />
          </div>
          <button onClick={handleUpdate}>update</button>
          <button onClick={handleDeleteButton}>delete</button>
        </>
        :
        gmdocs && gmdocs.length > 0 &&
        <div>
          { gmdocs.map(gd => <DocListing key={gd._id} doc={gd} />) }
        </div>
      }
    </TestWrapper>
  )
}
