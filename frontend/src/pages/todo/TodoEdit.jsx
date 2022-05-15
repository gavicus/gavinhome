import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"

import todoService from '../../features/todo/todoService'

export const TodoEdit = () => {
  const [todo, setTodo] = useState(null)
  const [formValues, setFormValues] = useState({
    text: '',
    comments: '',
    done: false,
  })
  const { id } = useParams()
  const { user: loggedUser } = useSelector((state) => state.auth)

  const getTheTodo = async() => {
    const reply = await todoService.getOneTodo(
      id,
      loggedUser.token
    );
    if (!reply) { return }
    console.log({reply})
    setTodo(reply)
  }

  useEffect(() => {
    getTheTodo()
  }, [id])

  useEffect(() => {
    setFormValues(todo)
  }, [todo])

  const onSubmit = (event) => {
    event.preventDefault()
  }

  const onChange = (event) => {
    const name = event.target.name
    let value = event.target.value
    if (name === 'done') {
      value = (event.target.value === 'on')
    }
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  useEffect(() => {
    console.log({formValues})
  }, [formValues])

  return (
    <>
      <section className="heading">Todo edit</section>
      <span>{id}</span>

      {formValues &&
        <form onSubmit={onSubmit}>

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

          <div className="form-group">
            <label htmlFor='done'>Done</label>
            <input
              type="checkbox"
              name="done"
              checked={formValues.done ? "on" : "off"}
              onChange={onChange}
            />
          </div>
          
        </form>
      }
    </>
  )
}
