import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout, reset } from '../features/auth/authSlice'
import { HoverMenu } from './HoverMenu'
import './Header.css'
import logoImage from '../assets/favicon-32x32.png'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const userOptions = [
    { name: <><FaSignOutAlt style={{marginRight: '5px'}} />Logout</>, callback: onLogout },
  ]
    
  const adminOptions = [
    { name: 'Questions', link: '/questions' },
    { name: 'Create Question', link: '/questionnew' },
    { name: 'Score Report', link: '/flashcards/scorereport' },
    { name: 'Illum', link: '/illum' },
    { name: 'Test', link: '/test' },
  ]

  const guestOptions = [
    { name: <><FaSignInAlt style={{marginRight: '5px'}} /> Login</>, link: '/login' },
    { name: <><FaUser style={{marginRight: '5px'}} /> Register</>, link: '/register' },
  ]

  const UserItems = () => {
    return (
      <div className='userItems'>
          {(user.admin === true || user.admin === 'true') &&
            <HoverMenu menuItems={adminOptions}>Admin</HoverMenu>
          }

          <HoverMenu menuItems={userOptions}>
            <span><FaUser style={{marginRight: '5px'}} />{user.name}</span>
          </HoverMenu>

      </div>
    )
  }

  const GuestItems = () => {
    return (
      <div className="userItems">
        <HoverMenu menuItems={guestOptions}>
          <FaUser style={{ marginRight: "5px" }} />
          Guest Menu
        </HoverMenu>
      </div>
    );
  }

  return (
    <header className='header'>

      <div className='logo'>
        <Link to='/'>
          <img src={logoImage} />
          <div className='logotext'>
            Home
          </div>
        </Link>
      </div>
      { user ? <UserItems /> : <GuestItems /> }

    </header>
  )
}
