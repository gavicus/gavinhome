import { useEffect, useState } from 'react'

import './TypedItemForm.css'

export const TypedItemForm = ({title, type, item, onSubmit}) => {
  const [data, setData] = useState({})

  useEffect(() => {
    if (item) {
      console.log({item})
      setData(item)
    }
  }, [item])

  const handleFieldChange = (event) => {
    const newData = { ...data }
    newData[event.target.name] = event.target.value
    setData(newData)
  }

  const handleSubmit = () => {
    onSubmit(data)
  }

  const handleCancel = () => {
    onSubmit(null)
  }

  return (
    <section className="typedItemForm">
      <div>{title}</div>
      {
        item
        ?
        <div>{item.type}: {item.title}</div>
        :
        <div>{type}</div>
      }
      <section className="formElement">
        <label htmlFor="title">title</label>
        <input type="text" name="title" onChange={handleFieldChange} value={data.title} />
      </section>

      <section className="buttons">
        <button className="submit" onClick={handleSubmit}>submit</button>
        <button className="cancel" onClick={handleCancel}>cancel</button>
      </section>
    </section>
  )
}
