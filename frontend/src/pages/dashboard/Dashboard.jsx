import { useSelector } from 'react-redux'

import { DashLink } from './DashLink'

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const links = [
    {
      caption: 'Todo List',
      detail: 'keep track of tasks',
      link: '/todo',
      image: {
        url: 'https://c8.alamy.com/zooms/9/ab0836fd7b5d48d78bca2978ffc628d5/2gc1fxx.jpg',
        size: '150%',
      }
    },
    {
      caption:'FlashCards',
      detail:'take a quiz',
      link:'/flashcards',
      image: {
        url: 'https://s35691.pcdn.co/wp-content/uploads/2021/11/day-picture-id1163588010.jpg',
        size: '300%',
        position: 'right',
      },
    },
  ]

  return (
    user ? (
      <>
        <section className="heading">Dashboard</section>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {links.map((item) => (
            <DashLink
              key={item.link}
              image={item.image}
              caption={item.caption}
              detail={item.detail}
              linkUrl={item.link}
            />
          ))}
        </section>
      </>
    ) : (
      <span>Login or register with the guest menu on the upper-right.</span>
    )
  );
}