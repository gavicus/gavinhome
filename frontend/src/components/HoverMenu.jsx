import { Link } from 'react-router-dom'

import './HoverMenu.css'

export const HoverMenu = ({children, menuItems}) => {
  return (
    <div className="hovermenu">
      <div className="dropbtn">{children}</div>
      <div className="dropcontent">
        {menuItems.map((item) => (
          item.link ? (
            <Link to={item.link}>
              <div className="droplink">{item.name}</div>
            </Link>
          ) : (
            <div className="droplink" onClick={item.callback}>{item.name}</div>
          )
        ))}
      </div>
    </div>
  )
}
