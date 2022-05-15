import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import todoService from '../../features/todo/todoService'

export const TodoList = () => {
  const [todos, setTodos] = useState([])
  const { user: loggedUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const getTheTodos = async() => {
    const reply = await todoService.getTodos(
      { userId: loggedUser._id },
      loggedUser.token
    );
    if (!reply) { return }
    setTodos(reply)
  }

  useEffect(() => {
    getTheTodos()
  }, [])

  const onClickRow = (id) => {
    navigate(`/todoedit/${id}`)
  }

  return (
    <>
      <section className="heading">Todo list</section>
      <section>
        <table>
          <tbody>
            {todos.map((t) => (
              <tr key={t._id} className='list-item' onClick={() => onClickRow(t._id)}>
                <td>{t.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
