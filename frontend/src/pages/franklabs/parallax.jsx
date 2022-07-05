import plane from '../../assets/plane.jpeg'
import elephant from '../../assets/elephant.webp'
import './parallax.css'

export const Parallax = () => {
  return (
    <div className="wrapper">
      <div className="frame">
        <p>parallax</p>
        <img src={plane} alt="plane" />
        <img src={elephant} alt="elephant" className="elephant foreground" />
      </div>
    </div>
  )
}
