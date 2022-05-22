import React from 'react'
import './partnerCard.css'

const PartnerCard = ({partnerImg}) => {
  return (
    <div className='partnerCard'>
        <img src={partnerImg} alt="partner-img" />
    </div>
  )
}

export default PartnerCard