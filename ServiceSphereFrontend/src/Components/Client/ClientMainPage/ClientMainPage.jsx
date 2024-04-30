import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ClientMainPage.css';
import { FaBriefcase } from 'react-icons/fa';
const ClientMainPage = () => {
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
            <div className="about" id="about">
                <div className="inAbout py-5 px-5">
                    <div className="all-title">
                        <div className="title position-relative text-center">
                            <div className="above-text text-cc">

                            </div>
                        </div>

                    </div>
                    <div className="row row-cols-1 row-cols-md-2 pt-5">

                        <div className="col-md-7">
                            <h1 className='mb-5'>Welcome, (Name), Let’s start and post a job.</h1>
                            <p className='lead'>
                                Pellentesque vel elit egestas, pretium est ac, convallis orci.
                                Vivamus sem nisl, tristique vel fringilla vitae, efficitur at eros.
                                Duis aliquet aliquet pharetra. Suspendisse bibendum erat quis gravida
                                pulvinar. Phasellus vel eros porta, blandit dui ac, viverra felis.

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
                            <button class="learn-more-btn mt-4 ">
                                Post a Job Now
                                <span class="price"></span>
                            </button>

                        </div>
                        <div className="col-md-5">
                            <img src={require('../../../Images/clienthomepage.png')} alt="logo" className='w-100 h-100' />
                        </div>
                    </div>
                </div>
            </div>

            
   


            <div className="work py-5" id="work">
                <div className='yourlastposts'>
                    <h2 className='text-white fw-bold '><span><FaBriefcase className="text-white fs-1  me-2 pb-2" /></span>Your Last Posts </h2>
                </div>
                <div className='w-100 d-flex justify-content-center align-items-center my-5 '>
                    <div className="box-div d-flex align-items-center py-5 rounded-5 container Rectangle">
                        <div className="container">
                            <div className='row'>

                                <div className="d-flex">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-12 col-xl-2 ">
                                            <div className="imgdiv ">
                                                <img src={require('../../../Images/unknown.webp')} className="rounded img-fluid unknown" alt="Profile" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-xl-8">
                                            <div>
                                                <h3 className="font-weight-bold mb-3">Title</h3>
                                                <h4 className="font-weight-bold mb-3">Budget</h4>
                                                <p><span className="fs-5 lead">Light up your projects with our electrical expertise! From fixes to full installations, our skilled electricians have you covered. Illuminate your space effortlessly – because your electrical needs deserve a spark of excellence. Let's power up your vision together</span></p>

                                                <div >
                                                    <h4 className="font-weight-bold mt-4 mb-4">Skills required</h4>
                                                    <div className='buttonsDiv'>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>





                        </div>
                    </div>
                </div>
                <div className='w-100 d-flex justify-content-center align-items-center my-5'>
                    <div className="box-div d-flex align-items-center py-5 rounded-5 container Rectangle">
                        <div className="container">
                            <div className='row'>

                                <div className="d-flex">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-12 col-xl-2 ">
                                            <div className="imgdiv ">
                                                <img src={require('../../../Images/unknown.webp')} className="rounded img-fluid unknown" alt="Profile" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-xl-8">
                                            <div>
                                                <h3 className="font-weight-bold mb-3">Title</h3>
                                                <h4 className="font-weight-bold mb-3">Budget</h4>
                                                <p><span className="fs-5 lead">Light up your projects with our electrical expertise! From fixes to full installations, our skilled electricians have you covered. Illuminate your space effortlessly – because your electrical needs deserve a spark of excellence. Let's power up your vision together</span></p>

                                                <div >
                                                    <h4 className="font-weight-bold mt-4 mb-4">Skills required</h4>
                                                    <div className='buttonsDiv'>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                        <button type="button" className="pill-button me-3" >
                                                            skill
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ClientMainPage;
