import { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function NavMenu({show, onClick}) {
  const menuItems = [
    { name: 'Flash Cards', link: '/flashcards' },
    { name: 'Questions', link: '/questions' },
    { name: 'Create Question', link: '/questionnew' },
    { name: 'Score Report', link: '/flashcards/scorereport' },
    { name: 'Test', link: '/test' },
  ]

  const onLink = (event) => {
    onClick()
  }

  return (
    <div className="navMenu" style={{ visibility: show ? 'visible' : 'hidden' }}>
      <ul className="navMenuList">
        {menuItems.map((item) => (
          <li key={item.link}>
            <Link onClick={onLink} to={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const onMenuClick = () => {
    setShowMenu((previous) => !previous)
  }

  const onLinkClick = () => {
    setShowMenu(false)
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Home</Link>
      </div>
      <ul>
        { user ? (
          <>
            <li>
              {(user.admin === true || user.admin === 'true') &&
                <>
                  <button className='btn' onClick={onMenuClick}>menu</button>
                  <NavMenu show={showMenu} onClick={onLinkClick} />
                </>
              }
            </li>
            <li>
              <span><FaUser />{user.name}</span>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
          )
        }
      </ul>
    </header>
  )
}
