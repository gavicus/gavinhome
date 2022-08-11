import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import dataService from '../../features/data/dataService'
import { PageStandard } from '../../components/PageStandard'
import { ButtonMenu } from '../../components/ButtonMenu'

const FormWrapper = styled.div`
  display: grid;
  row-gap: 15px;
  justify-items: start;
`

const FormRow = styled.div`
  display: grid;
  justify-items: start;
  textarea {
    width: 400px;
    height: 50px;
  }
`

const VidList = styled.div`
  margin: 20px;
  display: grid;
  gap: 10px;
`

const VidEntry = styled.a`
  width: fit-content;
  cursor: pointer;
  img {
    max-width: 150px;
  }
  div {
    font-size: .8em;
    line-height: .8em;
  }
`

export const Guitar = () => {
  const [currentTab, setCurrentTab] = useState('songs')
  const [data, setData] = useState(null)

  const { user: loggedUser } = useSelector((state) => state.auth)
  const tabNames = ['songs','backing']
  let firstLoad = false;

  const getData = () => {
    dataService.listData(loggedUser._id, loggedUser.token)
    .then((entries)=>{
      setData(entries.filter(e => e.project === "guitar"))
    })
  }

  useEffect(() => {
    if (firstLoad) { return }
    firstLoad = true
    getData()
  }, [])

  useEffect(() => {
    if (data) {
      console.log({data})
    }
  }, [data])

  const handleTabClick = (response) => {
    setCurrentTab(response)
  }

  const DataForm = ({category, onClose}) => {
    const defaults = {title: '', url: '', thumbUrl: '', youtubeid: ''}
    const [formData, setFormData] = useState(defaults)

    const handleChange = (event) => {
      const newData = {
        ...formData,
        [event.target.name]: event.target.value,
      }
      setFormData(newData)
    }

    const handleSubmit = () => {
      const data = {
        userId: loggedUser._id,
        project: 'guitar',
        doc: {
          ...formData,
          category
        }
      }
      if (formData.youtubeid) {
        data.doc.url = `https://www.youtube.com/embed/${formData.youtubeid}?start=395&end=439&autoplay=1`
        data.doc.thumbUrl = `https://img.youtube.com/vi/${formData.youtubeid}/maxresdefault.jpg`
      }
      delete data.doc.youtubeid
      dataService.createData(data, loggedUser.token)
      console.log({data})
      onClose()
    }

    return (
      <FormWrapper>
        {
          Object.keys(defaults).map((field) => (
            <FormRow key={field}>
              <label htmlFor={field}>{field}</label>
              <textarea name={field} onChange={handleChange} />
            </FormRow>
          ))
        }
        <button onClick={handleSubmit}>submit</button>
        <button onClick={onClose}>cancel</button>
      </FormWrapper>
    )
  }

  const VidsTab = ({category}) => {
    const [showCreateForm, setShowCreateForm] = useState(false)

    const handleCloseForm = () => {
      setShowCreateForm(false)
    }

    if (data) {
      console.log({category})
      console.log({songs:data.filter(d => d.doc.category===category)})
    }

    return (
      <>
        <div>{category}</div>
        {
          currentTab === category && showCreateForm
          ?
          <DataForm category={category} onClose={handleCloseForm} />
          :
          <>
            <button onClick={() => setShowCreateForm(true)}>new</button>
            <VidList>
              {
                data &&
                data
                  .filter(d => d.doc.category===category)
                  .map((d, index) => (
                    <VidEntry key={`${index}`} href={d.doc.url} target="_blank">
                      <img src={d.doc.thumbUrl} alt="thumbnail" />
                      <div>{d.doc.title}</div>
                    </VidEntry>
                  ))
              }
            </VidList>
          </>
        }
      </>
    )
  }

  return (
    <PageStandard title="guitar">
      <ButtonMenu current = {currentTab} options={tabNames} onClick={handleTabClick} />
      { currentTab === 'songs' && <VidsTab category='songs' />}
      { currentTab === 'backing' && <VidsTab category='backing' />}
    </PageStandard>
  )
}
