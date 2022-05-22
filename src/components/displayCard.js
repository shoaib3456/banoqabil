import React from 'react'
import { Link } from 'react-router-dom'
import './displayCard.css'

const DisplayCard = ({bgImg,cardTitle,cardPara,linkText}) => {
  return (
    <div className='displayCard d-flex align-items-end' style={{background: `url(${bgImg})`}}>
      <div className='card-inner w-100 p-4 rounded-3'>
        <h4>{cardTitle}</h4>
        <p>{cardPara}</p>
        <Link to="/" className='text-secondary text-decoration-none card-link'><i className="bi bi-arrow-right-short"></i> {linkText}</Link>
      </div>
    </div>
  )
}

export default DisplayCard