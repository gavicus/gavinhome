import { Link } from 'react-router-dom'

import './DashLink.css'

export const DashLink = ({linkUrl,caption,detail,image}) => {
  const {url: imageUrl, size: imageSize, position: imagePosition} = image

  return (
    <Link to={linkUrl || ''}>
      <section className="dashLink">
        <div
          className="linkImage"
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: imageSize || 'cover',
            backgroundPosition: imagePosition || 'left',
          }}
        />
        <div className="linkText">
          <div className='caption'>{caption}</div>
          <div className='detail'>{detail}</div>
        </div>
      </section>
    </Link>
  );
}