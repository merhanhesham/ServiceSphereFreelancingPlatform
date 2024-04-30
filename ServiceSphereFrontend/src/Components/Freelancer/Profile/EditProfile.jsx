
import { Formik, Form, Field } from 'formik';
import { MdAccountCircle } from 'react-icons/md';
import './EditProfile.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaSync } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa'; 

const EditProfile = () => {
    const initialValues = {
        displayName: '',
        title: '',
        experienceLevel: '',
        phoneNumber: '',
        bio: '',
        education: ''
    }
    // Add other fields as needed

    const [profileUpdated, setUpdateProfile] = useState(null);
    const [services, setServices] = useState(null);
    const navigate = useNavigate();

    const updateProfile = async () => {
        try {
            const token = localStorage.getItem('user');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await axios.get(
                `https://localhost:7157/api/Freelancer/GetProfile`,
                { headers: headers }
            );

            console.log(response.data);
            setUpdateProfile(response.data);

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const removeService = async (serviceId) => {
        console.log("Removing service with ID:", serviceId);
        // Retrieve the authentication token, assuming it's stored in localStorage
        const token = localStorage.getItem('user');

        // Set up headers for the request
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Construct the URL with the serviceId
        const url = `https://localhost:7157/api/Services/DeleteService/${serviceId}`;

        try {
            // Make the DELETE request to the backend
            const response = await axios.delete(url, { headers });
            console.log(response.data); // Log the successful response from the server

            // Update the local state to reflect the deletion
            // Assuming `services` is your state variable holding the array of services
            setServices(currentServices => currentServices.filter(service => service.id !== serviceId));

        } catch (error) {
            console.error("Error removing service:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };


    const getUserServices = async () => { // New function to fetch services
        try {
            const token = localStorage.getItem('user');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `https://localhost:7157/api/Services/GetUserServices`,
                { headers: headers }
            );
            setServices(response.data); // Store the services data in state
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };
    useEffect(() => {
        updateProfile();
        getUserServices();
    }, []);

    const renderServices = () => {
        return (
            <div className="form-group">
                <label htmlFor="WorkExp">Add or delete services you offer</label>
                {services?.map((service, index) => (
                    <div key={`${service.name}-${index}`} className="d-flex align-items-center mb-2">
                        <button type="button" className="pill-button me-3 flex-grow-1">
                            {service.name}
                        </button>
                        <button
                            type="button"
                            className="btn "
                            onClick={() => removeService(service.id)}
                        >
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (

        <div className="about" id="about">
            <div className="w-100 d-flex justify-content-center align-items-center my-5">
                <div className="box-div bg-white d-flex align-items-center py-5">
                    <div className="container">
                        <h2 className='text-center mb-5 fw-bold '>Edit Your Profile <span ><MdAccountCircle size={40} className='mb-2' /></span></h2>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, actions) => {
                                console.log(values);
                                actions.setSubmitting(false);
                                // After you get the endpoint, you will call the updateProfile function here
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className='container'>
                                    <div className="form-group">
                                        <label htmlFor="displayName ">Display Name</label>
                                        <Field name="displayName" type="text" className="form-control" placeholder="Name" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <Field name="title" type="text" className="form-control" placeholder="Your job title" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="experienceLevel">Experience Level</label>
                                        <select as="select" name="experienceLevel" className="form-control" style={{ color: '#999' }} >
                                            <option value="" >Select your experience level</option>
                                            <option value="Beginner" style={{ color: 'black' }}>Beginner</option>
                                            <option value="Intermediate" style={{ color: 'black' }}>Intermediate</option>
                                            <option value="Advanced" style={{ color: 'black' }}>Advanced</option>
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <Field name="phoneNumber" type="tel" className="form-control" placeholder="Your phone number (e.g., 01006638039)" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="bio">Bio</label>
                                        <Field name="bio" as="textarea" className="form-control" placeholder="Share a bit about yourself. E.g., your professional background, passions, and key achievements." />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="education">Education</label>
                                        <Field name="education" type="text" className="form-control" placeholder="University/Major" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="WorkExp">Work Experience</label>
                                        <Field name="education" type="text" className="form-control" placeholder="Previous work" />
                                    </div>

                                    <div className="form-group">
                                        <div className="service-label-container mb-4">
                                            <label htmlFor="WorkExp" className="service-label me-4">Add, update or delete services you offer</label>

                                        </div>
                                        {services && services.length > 0 ? (
                                            services.map((service) => (

                                                <div key={service.id} className="container box-div rounded-5 mb-5 p-3">
                                                    <div className='container'>
                                                        <div className='container d-flex align-items-center mt-2 justify-content-end'>
                                                            <div className="editProfileButtons">
                                                                <button className=" mb-2 rounded-5 text-white my-2 py-2 me-3 p-3" onClick={() => removeService(service.id)}>
                                                                    <span className='me-2 solidPurple'><FaTrash /></span>
                                                                </button>
                                                                <button className=" mb-2 rounded-5 text-white my-2 py-2 p-3" onClick={() => navigate(`/update-service/${service.id}`)}>
                                                                    <span className='me-2 solidPurple'>  <FaPencilAlt /></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="service-detail">
                                                            <p ><strong>Service Name:</strong> <span>{service.name}</span></p>

                                                        </div>
                                                        <div className="service-detail"><strong>Price:</strong> <span>${service.price.toFixed(2)}</span></div>
                                                        <p className="service-detail"><strong>Description:</strong> <span>{service.description}</span></p>
                                                        <p className="service-detail"><strong>Category:</strong> <span>{service.category}</span></p>
                                                    </div>

                                                </div>



                                            ))
                                        ) : (
                                            <p>You have no services listed. Add a new service to see it here.</p>
                                        )}
                                        <button className="p-3 mb-2 rounded-4 text-white my-2 py-2 ms-3 blackbackground" onClick={() => { navigate('/AddServiceInEditProfile'); }}>
                                            <span className='me-2'><FaPlus /></span> Add Service
                                        </button>
                                    </div>


                                    {/* Add additional fields as needed */}
                                    <div div className='d-flex justify-content-end' >
                                        <Link to='/profile'><button type="submit" className="btn profilebtn mt-4" disabled={isSubmitting}>
                                            Save Changes
                                        </button></Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
