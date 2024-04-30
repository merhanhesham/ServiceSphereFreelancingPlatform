import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

export default function ProjectDetails() {
  return (
    <div>
      <div className="container">
        <div className="first-section p-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="item">
                        <h2>Welcome to project section</h2>
                        <p>In our Projects section, you have the flexibility to choose from multiple freelancers to suit your project needs. Engage in direct communication with our team through our built-in chat feature, ensuring seamless collaboration and clear communication throughout the project lifecycle</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="item">
                    <div className='video1'>
    <ReactPlayer
        url={require('../../Images/video2.mp4')}
        controls={false}
        playing={true} // Set playing to true for autoplay
        loop={true} // Set loop to true for continuous playback
        muted={true} // Set muted to true for autoplay without controls
        width="100%"
        volume={0}
      />
    </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='home-project'>
    <div className='position-relative'>
        <img src={require('../../Images/pexels-fauxels-3184325.jpg')} alt='project' className='img-fluid rounded rounded-4'/>
        <div className='position-absolute top-0 start-0 end-0 bottom-0 text-white d-flex flex-column justify-content-between' style={{fontSize:'3rem'}}>
            <p>Project</p>
           <div className='ms-auto'>
           <p>All You need in one place</p>
           </div>
        </div>
    </div>
    <div>
        <div className="container p-5 fw-bold">
            <div className="row">
                <div className="col-md-4">
                    <div className="item">
                    In our Projects section, you have the flexibility to choose from multiple freelancers to suit your project needs.
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="item">
                    At ServiceSphere, we prioritize your satisfaction and convenience,  
                   </div>
                </div>
                <div className="col-md-4">
                    <div className="item">
                    Engage in direct communication with our team through our built-in chat feature, ensuring seamless collaboration and clear  
                   </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div className='text-center'>
   <Link to='/login'> <button className='btn btn-dark'>Get Started</button></Link>
</div>
      </div>
    </div>
  )
}
