
import { Link, useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const links = [
    { name: 'Flash Cards', link: '/flashcards' },
    { name: 'Todo', link: '/todo' },
  ]

  return (
    <>
      <section className="heading">Dashboard</section>
      <section>
        <ul className="navMenuList">
          {links.map((item) => (
            <li key={item.link}>
              <Link to={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}