import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [services, setServices] = useState(null);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem('user');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const profile = await axios.get(
                `https://localhost:7157/api/Freelancer/GetProfile`,
                { headers: headers }
            );
            console.log(profile.data);
            setProfile(profile.data)

        }
        catch (error) {
            console.error("Error fetching profile:", error);
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
        getProfile();
        getUserServices();
    }, []);

    const renderSkills = () => {
        // Deduplicate based on skill name, ignoring case
        const uniqueSkillsByName = Array.from(new Map(
            profile?.skills.map(skill => [skill.name.toLowerCase(), skill])
        ).values());

        return uniqueSkillsByName.map((skill, index) => (
            // Use both skill.name and index in the key to ensure it's unique, especially if IDs are not used or not unique
            <button type="button" className="pill-button me-3" key={`${skill.name.toLowerCase()}-${index}`}>{skill.name}</button>
        ));
    };


    const renderCategories = () => {
        return profile?.categories?.map((category, index) => (
            <button type="button" className="pill-button me-3" key={`${category.name}-${index}`}>
                {category.name}
            </button>
        ));
    };

    const renderSubCategories = () => {
        return profile?.subCategories?.map((subCategory, index) => (
            <button type="button" className="pill-button me-3" key={`${subCategory.name}-${index}`}>
                {subCategory.name}
            </button>
        ));
    };

    const renderServices = () => {
        return services?.map((service, index) => (
            <button type="button" className="pill-button me-3 mb-3" key={`${service.name}-${index}`}>
                {service.name}
            </button>
        ));
    };


    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="about" id="about">
            <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center my-5">
                <div className="box-div shadow bg-white d-flex align-items-center py-5">
                    <div className="container">
                        <div className='d-flex justify-content-end'>
                            <Link to="/edit-profile"><button type="button" className="btn mb-3 font-weight-bold profilebtn"><span>Edit Profile</span></button></Link>
                        </div>
                        <div className='LineBelowDiv row'>
                            <div className="row row-cols-1 row-cols-md-2 mb-4">
                                <div className="pe-4 d-flex">
                                    <div>
                                        <div className="row justify-content-center">
                                            <div className="col-sm-12 col-xl-4">
                                                <div className="imgdiv">
                                                    <img src={require('../../../Images/unknown.webp')} style={{ border: '2px solid #a855f7' }} className="rounded w-100" alt="Profile" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-xl-7 offset-xl-1">
                                                <div>
                                                    <h4 className="font-weight-bold mb-3">{profile.displayName}</h4>
                                                    <p><span className="fs-5 lead">{profile.title}</span></p>
                                                    <p><span className="fs-5 lead">{profile.experienceLevel}</span></p>
                                                    <p><span className="fs-5 lead">{profile.phoneNumber}</span></p>
                                                    <p><span className="fs-5 lead">Ismailia, Egypt</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <h4 className="font-weight-bold mb-3">About Me</h4>
                                    <p className='lead'>{profile.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div className='LineBelowDiv row'>
                            <div className='mb-4'>
                                <h4 className="font-weight-bold mt-4 mb-3">Education</h4>
                                <h5 className="font-weight-bold mb-3">{profile.education || 'Degree not available'}</h5>
                            </div>
                        </div>
                        <div className='LineBelowDiv row'>
                            <h4 className="font-weight-bold mt-4 mb-4">Skills</h4>
                            <div className='buttonsDiv mb-5'>
                                {profile?.skills && profile.skills.length > 0 ? (
                                    renderSkills()
                                ) : (
                                    <div className="text-muted">
                                        <p>No skills listed. Click "Edit Profile" to add skills.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='LineBelowDiv row'>
                            <h4 className="font-weight-bold mt-4 mb-4">Service Categories Offered</h4>
                            <div className='buttonsDiv mb-5'>
                                {profile?.categories && profile.categories.length > 0 ? (
                                    renderCategories()
                                ) : (
                                    <div className="text-muted">
                                        <p>No categories listed. Click "Edit Profile" to add categories.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='LineBelowDiv row'>
                            <h4 className="font-weight-bold mt-4 mb-4">Service SubCategories Offered</h4>
                            <div className='buttonsDiv mb-5'>
                                {profile?.subCategories && profile.subCategories.length > 0 ? (
                                    renderSubCategories()
                                ) : (
                                    <div className="text-muted">
                                        <p>No SubCategories listed. Click "Edit Profile" to add SubCategories.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Implement Services Offered and Reviews similarly if needed */}
                        <div className='LineBelowDiv row'>
                            <h4 className="font-weight-bold mt-4 mb-4">Services Offered</h4>
                            <div className='buttonsDiv mb-5'>
                                {services && services.length > 0 ? (
                                    renderServices()
                                ) : (
                                    <div className="text-muted">
                                        <p>No services listed. Click "Edit Profile" to add services.</p>
                                    </div>
                                )}

                            </div>

                        </div>
                        <div className='LineBelowDiv row'>
                            <h4 className="font-weight-bold mt-4 mb-3">Reviews</h4>
                            <div className='Review mb-5'>

                            </div>

                        </div>
                        <div className=' row'>
                            <h4 className="font-weight-bold mt-4 mb-3">Proposals</h4>
                            <div className='Review mb-5'>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
