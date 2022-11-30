import React from 'react'
import videoBg from '../assests/videos/video_m1.mp4'
import img_1 from '../assests/images/img_1.png'

export default function Main() {
  return (
    <div className='main'>
        <div className='overlay'>
         <video src={videoBg} autoPlay></video>
                <div className='content'>
                  <img src={img_1}></img>
                </div>
        </div>
    </div>
  )
}
