import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import authService from '../features/auth/authService'

export const UserMenu = ({onChange}) => {
  const [userList, setUserList] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const { user: loggedUser } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchData = async() => {
      const users = await authService.getUsers(loggedUser.token)
      setUserList(users)
    }
    fetchData()
  }, [loggedUser.token])

  const handleChange = (event) => {
    setSelectedUser(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div className="form-group">
      <label htmlFor="user">User</label>
      <select name="user" value={selectedUser} onChange={handleChange}>
        <option value={null}></option>
        {userList.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  )
}
