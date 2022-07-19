import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import todoService from '../../features/todo/todoService'
import { PageStandard } from '../../components/PageStandard'
import './TodoList.css'

export const TodoList = () => {
  const [todos, setTodos] = useState([])
  const { user: loggedUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const getTheTodos = async() => {
      const reply = await todoService.getTodos(
        { userId: loggedUser._id },
        loggedUser.token
      );
      if (!reply) { return }
      setTodos(reply)
    }
  
    getTheTodos()
  }, [])

  const onClickRow = (id) => {
    navigate(`/todoedit/${id}`)
  }

  const TodoEntry = ({data}) => {
    return (
      <div className="todoEntry">
        <div className="todoText">
          {data.text}
        </div>
        <div className="todoComment">{data.comments}</div>
      </div>
    )
  }

  const TodoRows = () => {
    const active = todos.filter(t => t.done === false)
    active.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    const done = todos.filter(t => t.done === true)
    done.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    return (
      <>
        {active.map((t) => (
          <li key={t._id} className='list-item active' onClick={() => onClickRow(t._id)}>
            <TodoEntry data={t} />
          </li>
        ))}
        <li><hr style={{margin: '20px 0'}} /></li>
        {done.map((t) => (
          <li key={t._id} className='list-item done' onClick={() => onClickRow(t._id)}>
            <TodoEntry data={t} />
          </li>
        ))}
      </>
    )
  }

  return (
    <PageStandard title="todo list">
      <section className="createNewLink">
        <Link to={'/todocreate'}>create a new entry</Link>
      </section>
      <section>
        <ul>
          <TodoRows />
        </ul>
      </section>
    </PageStandard>
  )
}
