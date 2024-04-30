import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FreelancerHomePage.css';
import { FaBriefcase } from 'react-icons/fa';
import { FaTools, FaProjectDiagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const FreelancerHomePage = () => {

    const [posts, setPosts] = useState([]);
    const [openSections, setOpenSections] = useState({});
    const [selectedService, setSelectedService] = useState('individual');
    const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category
    const [PostFlag, setPostFlag] = useState(true)


    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        fetchPosts(selectedCategory); // Fetch posts based on selected category
    }, [selectedService, selectedCategory]); // Add selectedCategory as a dependency

    const fetchPosts = async (categoryId = null) => { // Default parameter value
        try {
            const token = localStorage.getItem('user');
            const headers = { Authorization: `Bearer ${token}` };
            const endpoint = selectedService === 'individual'
                ? `https://localhost:7157/api/Posting/GetAllServicePostings`
                : `https://localhost:7157/api/Posting/ProjectPostings`;
            const response = await axios.get(endpoint, {
                headers: headers,
                params: { CategoryId: categoryId }, // Include category ID in the request
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };


    const renderPosts = () => (
        <div className='d-flex align-items-center justify-content-center'>
            <div className='row d-flex justify-content-center postsdiv w-100'>
                {posts.length>0 ? (posts.map(post => (
                    
                        <div key={post.id} className='d-flex justify-content-center align-items-center my-5 col-md-5 mx-5 post'>
                            <div className="job shadow d-flex align-items-center py-4 rounded-5 container">
                                <div className="container">
                                    <div className='row'>
                                        <div className="d-flex">
                                            <div className="row justify-content-center w-100">
                                                <div className="col-sm-12 col-xl-2 ">
                                                    <div className="imgdiv ">
                                                        <img src={require('../../../Images/unknown.webp')} className="rounded img-fluid unknown" alt="Profile" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-xl-8">
                                                    <div>
                                                        <h3 className="font-weight-bold mb-3 mt-3 ">{post.title}</h3>
                                                        <h4 className="font-weight-bold mb-3">Budget: {post.budget ? `$${post.budget}` : 'N/A'} </h4>
                                                        <h4 className="font-weight-bold mb-3">Category: {`Category ID ${post.categoryId}`}</h4>
                                                        <h4 className="font-weight-bold mb-3">Duration: {post.duration || 'N/A'}</h4>
                                                        <h4 className="font-weight-bold mb-3">Deadline: {post.deadline ? new Date(post.deadline).toLocaleDateString() : 'N/A'} </h4>
                                                        <p><span className="fs-5 lead">{post.description}</span></p>

                                                        <div className='d-flex justify-content-end mt-3'>
                                                        <Link to={`/Proposal/${PostFlag}/${post.id}`}><button className="btn main-btn pill-button">Apply</button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))): (
                    <div className="no-posts-message">No posts found for this category!</div>
                )}
            </div>
        </div>
    );

    const servicesContent = {
        individual: renderPosts(),
        extensive: renderPosts()
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    return (
        <div>

            {/*<div className="container w-100 min-vh-100 d-flex justify-content-center align-items-center ">

    </div>*/}
            <div >
                <div >
                    {/*video */}
                    <img src={require('../../../Images/FreelancerHomePage.png')} alt="video" className='w-100' />
                </div>
            </div>
            <div style={{ paddingLeft: '100px', paddingRight: '100px' }} className='jobs-search '>
                <div className="py-5 container-fluid ">
                    <div className='d-flex w-100 py-5 row'>
                        <div className='col-md-8 jobs-titles'>
                            <h1 className='fw-bold mb-5 '><span><FaBriefcase className="fs-1 me-2 pb-2" /></span>Jobs </h1>
                            <div className='row'>
                                <h2 className='text-black fw-bold col-md-6'><span></span><FaTools className='me-3' /><span className=' border-bottom' style={{ cursor: 'pointer' }} onClick={function() { setSelectedService('individual'); setPostFlag(true)}}>Individual Services</span></h2>
                                <h2 className='text-black fw-bold col-md-6'><FaProjectDiagram className='me-2' />  <span className='border-bottom' style={{ cursor: 'pointer' }} onClick={function() { setSelectedService('extensive'); setPostFlag(false)}}>Extensive Projects</span> </h2>
                            </div>
                        </div>

                        <div className="search-panel my-5 col-md-4">
                            <h2 className='jobsTitle solidPurple'>Refine your Search</h2>
                            <div className="search-section">
                                <button className="search-section-button" onClick={() => toggleSection('category')}>
                                    Category {openSections.category ? '-' : '+'}
                                </button>
                                <div className={`search-section-dropdown ${openSections.category ? 'open' : ''}`}>
                                    <div className="search-section-content clickable" onClick={() => handleCategoryChange(null)}>All Categories</div>
                                    <div className="search-section-content clickable" onClick={() => handleCategoryChange('1')}>Construction & Renovation</div>
                                    <div className="search-section-content clickable" onClick={() => handleCategoryChange('2')}>Event Planning</div>
                                    <div className="search-section-content clickable" onClick={() => handleCategoryChange('3')}>Education</div>
                                </div>
                            </div>
                            {/* Add other sections following the same pattern */}
                        </div>

                    </div>

                    {/* Conditionally render content based on selected service */}
                    {selectedService === 'individual' ? servicesContent.individual : servicesContent.extensive}


                </div>
            </div>
        </div>


    );
};

export default FreelancerHomePage;
