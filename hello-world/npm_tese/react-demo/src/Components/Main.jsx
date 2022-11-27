import React from 'react'
import videoBg from '../assests/video_m1.mp4'

export default function Main() {
  return (
    <div className='main'>
        <div className='overlay'></div>
        <video src={videoBg} autoPlay></video>
        <div className='content'>
            <h1>Welcome</h1>
            <p>to my site Matte.</p>
        </div>
    </div>
  )
}
