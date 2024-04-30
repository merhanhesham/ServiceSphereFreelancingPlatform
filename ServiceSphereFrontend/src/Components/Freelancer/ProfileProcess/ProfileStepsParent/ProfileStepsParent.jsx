import React from 'react';
import ProfileStep1 from '../ProfileStep1';
import ProfileStep2 from '../ProfileStep2';
import ProfileStep3 from '../ProfileStep3';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

function ProfileStepsParent() {
    
    const [currentStep, setCurrentStep] = useState(1);
    const [myProfile, setProfile] = useState(null);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        displayName: '',
        experienceLevel: '',
        phoneNumber: '',
        Title: '',
        Education: '',
        WorkExperience: '',
        experienceLevel:'',
        Bio: '',
        CategoryIds: [],
        SubCategoryIds: [],
        Skills: []
    });

    useEffect(() => {
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
                setProfile(profile.data);
                setFormData({
                    DisplayName: profile.data?.displayName || '',
                    experienceLevel: profile.data?.experienceLevel || '',
                    phoneNumber: profile.data?.phoneNumber || '',
                    Title: '',
                    Education: '',
                    WorkExperience: '',
                    Bio: '',
                    CategoryIds: [],
                    SubCategoryIds: [],
                    Skills: []
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        getProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    

    // Functions to navigate between steps
    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    // Function to submit data (will be implemented in the next step)
    const submitFormData = async () => {
        try {
            // Transform the Skills string into an array of objects
            const skillsArray = formData.Skills.split(',').map(skill => ({ name: skill.trim() }));

            const transformedFormData = {
                ...formData,
                Skills: skillsArray,
            };
            console.log(transformedFormData)
            const token = localStorage.getItem('user'); // Retrieve the token from local storage
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the authorization header
            };
            const response = await axios.put('https://localhost:7157/api/Freelancer/UpdateProfile', transformedFormData, {
                headers: headers, // Use the headers object with the Authorization included
            });
            console.log(response.data);
            // Handle post-submission logic (e.g., redirecting to a success page)
        } catch (error) {
            console.error("Error updating profile:", error);
            // Handle errors (e.g., displaying error messages to the user)
        }
        navigate('/ProfileStep4');
    };

    console.log(formData);
    return (
        <div>
            {currentStep === 1 && <ProfileStep1 formData={formData} handleChange={handleChange} nextStep={nextStep} />}
            {currentStep === 2 && <ProfileStep2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
            {currentStep === 3 && <ProfileStep3 formData={formData} handleChange={handleChange} nextStep={submitFormData} prevStep={prevStep} />}
            {/* Repeat for other steps */}
        </div>
    );

}

export default ProfileStepsParent;
