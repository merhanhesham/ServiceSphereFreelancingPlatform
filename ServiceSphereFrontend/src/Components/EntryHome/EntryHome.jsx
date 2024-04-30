import React from 'react'
import ReactPlayer from 'react-player'
import './entryhome.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';




export default function EntryHome() {
  {/* what redirect me to? get started button */ }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div id='entryhome'>
      <div className="firstsection">


        <div className='video1 d-flex align-items-center p-0' >
          <ReactPlayer
            url={require('../../Images/video1.mp4')}
            controls={false}
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            volume={0}
          />
        </div>

        <div>
          <h2 className='fw-bold text-center my-5'>Step into ... the future of the work</h2>
        </div>
      </div>

      <div className='second-section  text-white text-center d-flex justify-content-center align-items-center' style={{ minHeight: '40vh' }}>
        <div>
          <h1 className='fsVeryLarge mb-5 certainmargintop'>Welcome <br /> to ServiceSphere!</h1>
          <p className='lead mb-5'>Dicover Endless opportunities </p>

          <Link to="/Home" >
            <button className="learn-more-btn mt-4 certainmarginbottom">
              Get Started
              <span className="price"></span>
            </button>
          </Link>
        </div>
      </div>


      <div className="third-section p-5 ">

        <div className="slider-container text-white fw-bold fs-2 ">
          <Slider {...settings}>
            <div>
              <h1 className='container mb-3 fslarge'>Education</h1>
              <div className="categoryImage container text-center">

                <img src={require('../../Images/pexels-祝-鹤槐-716276.jpg')} alt='education' className=' w-100 h-100 rounded-2 m-auto' style={{ maxHeight: '60vh' }} />
                <p className='my-4'>Impowerment through education</p>
              </div>
            </div>
            <div>
              <h1 className='container mb-3 fslarge '>Contruction & Renovation</h1>
              <div className="categoryImage container text-center" >

                <img src={require('../../Images/pexels-boris-hamer-14367420.jpg')}  alt='Contruction & Renovation' className=' w-100 h-100 rounded-2 m-auto' style={{ maxHeight: '60vh' }} />
                <p className='my-4'>Transforming Spaces, Building Legacies.</p>
              </div>
            </div>
            <div>
              <h1 className='container mb-3 fslarge'>Event Planning</h1>
              <div className="categoryImage container text-center">

                <img src={require('../../Images/pexels-jonathan-borba-9703865.jpg')} alt='education' className=' w-100 h-100 rounded-2 m-auto' style={{ maxHeight: '60vh' }} />
                <p className='my-4'>Let's Create Your Perfect Moment.</p>
              </div>
            </div>

          </Slider>
        </div>
      </div>

      <div className="forth-section p-5 my-5">
        <div className="container-fluid ms-5">
          <h2 className='fw-bold'>Why businesses turn to ServiceSphere? </h2>
          <div className='pt-3'>
            <h3>Proof of quality</h3>
            <p>Check any pro’s work samples, client reviews, and identity verification.</p>
          </div>
          <div className='pt-3'>
            <h3> No cost until you hire</h3>
            <p>Interview potential fits for your job, negotiate rates, and only pay for work you approve.</p>
          </div>
          <div className='pt-3'>
            <h3> Safe and secure</h3>
            <p>Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.</p>
          </div>
        </div>

      </div>
    </div>

  )

}
