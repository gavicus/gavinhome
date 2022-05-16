import { useEffect, useState } from 'react'

export const TodoForm = ({todo, onSubmit, submitText}) => {
  const [formValues, setFormValues] = useState({
    text: '',
    comments: '',
    done: false,
  })

  useEffect(() => {
    if (todo) {
      setFormValues(todo)
    }
  }, [todo])

  const onChange = (event) => {
    const name = event.target.name
    let value = event.target.value
    if (name === 'done') {
      setFormValues((previous) => ({
        ...previous,
        [name]: !previous[name],
      }))
    } else {
      setFormValues((previous) => ({
        ...previous,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formValues)
  }

  return (
    <>
      {formValues &&
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor='text'>Text</label>
            <input
              name="text"
              value={formValues.text}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor='comments'>Comments</label>
            <input
              name="comments"
              value={formValues.comments}
              onChange={onChange}
            />
          </div>

          <div className="form-group" style={{display:'flex', gap:'8px'}}>
            <label htmlFor='done'>Done</label>
            <input
              type="checkbox"
              name="done"
              checked={formValues.done}
              onChange={onChange}
              style={{width: 'auto', marginTop: '6px'}}
            />
          </div>

          <div className="form-group">
            <button className="btn" type="submit">{submitText || 'Update'}</button>
          </div>
          
        </form>
      }
    </>
  )
}
