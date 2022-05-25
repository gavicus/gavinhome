import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import todoService from '../../features/todo/todoService'
import { TodoForm } from '../../components/TodoForm'

export const TodoEdit = () => {
  const [todo, setTodo] = useState(null)
  const { id } = useParams()
  const { user: loggedUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const getTheTodo = async() => {
      const reply = await todoService.getOneTodo(
        id,
        loggedUser.token
      );
      if (!reply) { return }
      setTodo(reply)
    }
  
    getTheTodo()
  }, [id, loggedUser.token])

  const handleSubmit = (data) => {
    todoService.updateTodo(data,loggedUser.token)
    navigate('/todo')
  }

  const onClickDelete = () => {
    if (window.confirm('Delete this entry?')) {
      todoService.deleteTodo(todo._id, loggedUser.token)
      navigate('/todo')
    }
  }

  return (
    <>
      <section className="heading">Todo edit</section>
      <TodoForm todo={todo} onSubmit={handleSubmit} />
      <button className="btn" onClick={onClickDelete}>Delete</button>
    </>
  )
}
