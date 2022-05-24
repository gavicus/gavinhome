import { Link } from 'react-router-dom'

export const FrankMain = () => {
  return (
    <>
      <section className="heading">franklabs</section>
      <section className="links" style={{display:'flex', flexDirection:'column'}}>
        <Link to='/friday'>Friday</Link>
        <Link to='/dots'>Dots</Link>
      </section>
    </>
  )
}
