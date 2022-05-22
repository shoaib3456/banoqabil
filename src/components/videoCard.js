import React from 'react'
import './videoCard.css'
import VideoModal from './videoModal'

const VideoCard = ({ bgImg, videoCode }) => {
  return (
    <>
      <div className='videoCard' style={{ background: `url(${bgImg})` }}>
        <VideoModal videoCode={videoCode} />
      </div>
    </>
  )
}

export default VideoCard