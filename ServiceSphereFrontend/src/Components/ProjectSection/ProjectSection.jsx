import React, { useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './ProjectSection.css'

function ProjectSection() {


    return (
        <div>
            <div className="container" >
                <div className='row d-flex my-5'>
                    <div className='col-md-5 my-5'>
                        <h1 className='mb-5 my-5'>Welcome to Project Section</h1>
                        <p className='lead'>In our Projects section, you have the flexibility to choose from multiple freelancers to suit your project needs. Engage in direct communication with our team through our built-in chat feature, ensuring seamless collaboration and clear communication throughout the project lifecycle</p>
                    </div>
                    <div className='col-md-5 d-flex align-items-center offset-md-2 my-5 '>
                        <ReactPlayer
                            url={require('../../Images/video2.mp4')}  // Adjust the URL path to where your video is located
                            controls={true}               // Provides play, pause, etc. controls
                            playing={false}               // Set to `true` if you want it to play automatically
                            loop={true}                   // Set to `true` to loop the video
                            width="100%"                  // Adjust width as needed
                            height="100%"                 // Adjust height as needed
                            muted={true}
                            className='my-5'                // Mute the video; change if needed
                        />
                    </div>
                </div>
            </div>
            <div className='black-border-bottom'></div>
            <div className='my-5 container px-5' style={{ height: '100vh', maxWidth: '100%' }}>
                <img src={require('../../Images/pexels-fauxels-3184325.jpg')} alt='education' className='w-100 h-100 rounded-2' style={{ objectFit: 'cover' }} />

            </div>
            <div className='container  my-5'>
                <div className='row d-flex  align-items-center justify-content-center'>
                    <div className='col-md-3 my-5'>
                        <p className='lead' >In our Projects section, you have the flexibility to choose from multiple freelancers to suit your project needs. Engage in direct communication with our team through our built-in chat feature, ensuring seamless collaboration and clear communication throughout the project lifecycle</p>
                    </div>
                    <div className='col-md-3 offset-md-1  my-5'>
                        <p className='lead'>At ServiceSphere, we prioritize your satisfaction and convenience,  </p>
                    </div>
                    <div className='col-md-3 offset-md-1 my-5'>
                        <p className='lead'>Engage in direct communication with our team through our built-in chat feature, ensuring seamless collaboration and clear communication throughout the project lifecycle</p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default ProjectSection;
