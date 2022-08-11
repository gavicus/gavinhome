import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import dataService from '../../features/data/dataService'
import { TestWrapper } from "./TestWrapper"

const StyledDatum = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`

export const TestListData = () => {
  const [data, setData] = useState([])
  const [selectedDatum, setSelectedDatum] = useState(null)
  const [datumObject, setDatumObject] = useState(null)
  const { user: loggedUser } = useSelector((state) => state.auth)

  const getData = () => {
    dataService.listData(loggedUser._id, loggedUser.token)
    .then((entries)=>{
      setData(entries)
    })
  }

  const getDatum = (datumId) => {
    dataService.getData(datumId, loggedUser.token)
    .then((response) => {
      setSelectedDatum(response)
      setDatumObject(JSON.parse(response.doc))
    })
  }

  const Datum = ({datum}) => (
    <StyledDatum onClick={() => getDatum(datum._id)}>
      <div>project: {datum.project}</div>
      <div>type: {datum.type}</div>
      <div>doc: {datum.doc}</div>
    </StyledDatum>
  )

  const closeDatumView = () => {
    setSelectedDatum(null)
    setDatumObject(null)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (event) => {
    if (datumObject) {
      const newDatum = {
        ...datumObject,
        [event.target.name]: event.target.value
      }
      setDatumObject(newDatum)
    }
  }

  const handleSubmit = () => {
    console.log({selectedDatum, datumObject})
    const submitData = {
      ...selectedDatum,
      doc: JSON.stringify(datumObject)
    }
    console.log({submitData})
    dataService.updateData(submitData, loggedUser.token)
    closeDatumView()
  }

  const handleDelete = () => {
    if (window.confirm("Delete this record?")) {
      dataService.deleteData(selectedDatum._id, loggedUser.token)
    }
    closeDatumView()
  }

  const DataDisplay = ({datum}) => {
    return (
      <>
        <div>project: {datum.project}</div>
        <div>type: {datum.type}</div>
        <div>created: {datum.createdAt}</div>
        <div style={{border: "1px solid gray", padding: "10px"}}>
          {
            Object.keys(datumObject).map((key) => (
              <div key={key}>
                {key}:&nbsp;
                <input name={key} onChange={handleChange} value={datumObject[key]}/>
              </div>
            ))
          }
          <button onClick={handleSubmit}>submit</button>
          <button onClick={handleDelete}>delete</button>
        </div>
        <button onClick={closeDatumView}>close</button>
      </>
    )
  }

  return (
    <TestWrapper title="list data">
        {
          selectedDatum
          ?
          <DataDisplay datum={selectedDatum} />
          :
          data.map(datum => (
            <Datum datum={datum} key={datum._id} />
          ))
        }
    </TestWrapper>
  )
}
