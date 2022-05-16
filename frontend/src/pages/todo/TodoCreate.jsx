import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import todoService from '../../features/todo/todoService'
import { TodoForm } from '../../components/TodoForm'

export const TodoCreate = () => {
  const navigate = useNavigate()
  const { user: loggedUser } = useSelector((state) => state.auth)

  const handleSubmit = (data) => {
    data['userId'] = loggedUser._id
    todoService.createTodo(data, loggedUser.token)
    navigate(`/todo`)
  }

  return (
    <>
      <section className="heading">Todo create</section>
      <TodoForm onSubmit={handleSubmit} submitText="Create" />
    </>
  )
}
