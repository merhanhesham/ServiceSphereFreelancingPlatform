import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'
import { FaBriefcase } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import ReactPlayer from 'react-player'

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Function to decode JWT and extract the userID in a case-insensitive manner
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      console.log("Decoded JSON payload:", jsonPayload); // Log the decoded JSON string
      console.log("Payload object:", payload); // Log the payload object

      return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchPosts = async () => {
    console.log('hello');
    const token = localStorage.getItem('user');
    if (!token) {
      console.error("No token found");
      //return;
    }

    const EmailAddress = decodeToken(token);
    if (!EmailAddress) {
      console.error("Invalid token or userID not found in token");
      //return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const response2 = await axios.get(
        `https://localhost:7157/api/Posting/GetAllServicePostings?EmailAddress=${EmailAddress}`,
        // Request body is empty, assuming serviceDto is being sent from the client
        { headers: headers } // Pass headers as a separate object
      );
      console.log(response2.data);
      setPosts(response2.data)


      /*const response = await fetch(`https://localhost:7157/api/Posting/GetAllServicePostings?EmailAddress=${EmailAddress}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });
      console.log(response);
      if (!response.ok) {
          throw new Error('Failed to fetch posts');
      }*/

      //const data = await response2.json();
      //setPosts(data);
    }
    catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log('failed to fetch');
    }
  }, []);

  return (
    <div>

      {/*<div className="container w-100 min-vh-100 d-flex justify-content-center align-items-center ">

    </div>*/}
      <div className="about " id="about">
        <div className="inAbout container">
          <div className="all-title">
            <div className="title position-relative text-center">
              <div className="above-text text-cc">

              </div>
            </div>

          </div>
          <div className="row row-cols-1 row-cols-md-2 pt-5 ">

            <div className="col-md-5">
              <h1 className='mb-5'>Welcome to ServiceSphere</h1>
              <p className='lead'>
                Connect with skilled freelancers for web development, design, and marketing tasks hassle-free. Get projects done efficiently with our user-friendly platform and secure payments.

              </p>
              <p className='lead'>
                Nunc placerat iaculis pulvinar. Nullam auctor mauris sed urna
                posuere volutpat. Mauris ut dui sit amet elit fermentum fermentum.
                Fusce tincidunt diam at bibendum porta.

              </p>
              <p className='lead'>
                Aliquam nunc felis, sagittis eu purus non, interdum vehicula urna.
                Vivamus congue diam sapien, eu pellentesque ipsum ultricies quis.
              </p>


            </div>
            <div className="col-md-6 offset-md-1">
              <ReactPlayer
                url={require('../../Images/video2.mp4')}  // Adjust the URL path to where your video is located
                controls={true}               // Provides play, pause, etc. controls
                playing={false}               // Set to `true` if you want it to play automatically
                loop={true}                   // Set to `true` to loop the video
                width="100%"                  // Adjust width as needed
                                // Adjust height as needed
                muted={true}
                className='my-5'                // Mute the video; change if needed
              />
            </div>
          </div>
        </div>
      </div>


      <div className="work py-5" id="work">
        <div className='homeSS '>
          <h2 className='text-white fw-bold '><span><FaInfoCircle className="text-white fs-1  me-2 pb-2" /></span>About</h2>
        </div>

        <div className='m'>
          <img src={require('../../Images/homepage.png')} alt="logo" className='w-100 h-100' />
        </div>
        <div className='container'>
          <h2 className='text-white homeSpacing fs-larger'>
            At ServiceSphere, our approach to service is tailored to meet your digital needs with precision and efficiency. We offer a comprehensive range of services including web development, design, content creation, digital marketing, and more. Our team of skilled freelancers undergoes rigorous vetting to ensure top-notch quality in every project.
          </h2>
        </div>

      </div>
    </div>


  );
};

export default Home;
