import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import dataService from '../../../features/data/dataService'

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

export const VidForm = ({category, onClose}) => {
  const { user: loggedUser } = useSelector((state) => state.auth)
  const defaults = {
    title: '',
    auto: true,
    url: '',
    thumbUrl: '',
    youtubeid: '',
    startTime: '',
    endTime: '',
  }
  const [formData, setFormData] = useState(defaults)

  const handleChange = (event) => {
    const newData = { ...formData }
    if (event.target.type==='checkbox') {
      newData[event.target.name] = event.target.checked
    } else {
      newData[event.target.name] = event.target.value
    }
    setFormData(newData)
  }

  const handleSubmit = () => {
    const data = {
      userId: loggedUser._id,
      project: 'guitar',
      doc: { category, title: formData.title }
    }
    if (formData.auto) {
      data.doc.url = `https://www.youtube.com/embed/${formData.youtubeid}?autoplay=1`
      if (formData.startTime) {
        data.doc.url += `&start=${formData.startTime}`
      }
      if (formData.endTime) {
        data.doc.url += `&end=${formData.endTime}`
      }
      data.doc.thumbUrl = `https://img.youtube.com/vi/${formData.youtubeid}/maxresdefault.jpg`
    } else {
      data.doc.url = formData.url
      data.doc.thumbUrl = formData.thumbUrl
    }
    dataService.createData(data, loggedUser.token)
    onClose()
  }

  const FormField = ({name, textarea}) => {
    return (
      <FormRow>
        <label htmlFor={name}>{name}</label>
        {
          textarea
          ?
          <textarea name={name} onChange={handleChange} />
          :
          <input name={name} value={formData[name]} onChange={handleChange} />
        }
      </FormRow>
    )
  }

  return (
    <FormWrapper>
      {FormField({name:"title", textarea:true})}
      <label htmlFor="auto">
        <input type="checkbox" name="auto" checked={formData.auto} onChange={handleChange} />
        &nbsp;auto
      </label>
      {
        formData.auto
        ?
        <>
          {FormField({name:"youtubeid"})}
          {FormField({name:"startTime"})}
          {FormField({name:"endTime"})}
        </>
        :
        <>
          {FormField({name:"url", textarea:true})}
          {FormField({name:"thumbUrl", textarea:true})}
        </>
      }
      <button onClick={handleSubmit}>submit</button>
      <button onClick={onClose}>cancel</button>
    </FormWrapper>
  )
}
