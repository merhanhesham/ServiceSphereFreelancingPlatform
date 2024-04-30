import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../Variables';
import { LiaFileContractSolid } from 'react-icons/lia';
import { FaFileContract } from 'react-icons/fa';

export default function PostContract({Role}) {
    const [Contracts, setContracts] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [selectedStatus, setselectedStatus] = useState(0); // New state for selected status

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const handlestatusChange = (statusId) => {
        setselectedStatus(statusId);
        GetAllContracts(statusId)
    };
    //Get All Contracts 
    async function GetAllContracts(status) {
        try {
            const token = localStorage.getItem("user");
            console.log(token);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const { data } = await axios.get(`${BASE_URL}/api/Agreements/GetPostContracts?status=${status}`, { headers: headers });
            console.log(data);
            setContracts(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAllContracts(0);


    }, [])


    return (
        <>
            <div className="container">
                
                <div className='fs-1 main-color d-flex align-items-center pt-2 justify-content-center'>
                    <LiaFileContractSolid />
                    <h2 className="ms-3 ">Post Contracts</h2>
                </div>
                <div className="search-panel my-5 col-md-4">
                            <h5 className='jobsTitle solidPurple'>Refine your Search</h5>
                            <div className="search-section">
                                <button className="search-section-button" onClick={() => toggleSection('status')}>
                                    status {openSections.status ? '-' : '+'}
                                </button>
                                <div className={`search-section-dropdown ${openSections.status ? 'open' : ''}`}>
                                    <div className="search-section-content clickable" onClick={() => handlestatusChange(0)}>All Current Contracts</div>
                                    <div className="search-section-content clickable" onClick={() => handlestatusChange(4)}>Terminated</div>
                                </div>
                            </div>
                            {/* Add other sections following the same pattern */}
                        </div>
                <div className="Current-Contracts mt-4">
                    <h3>Your Contracts : </h3>
                    <p className="mb-4">Feel safe with us in our ServiceSphere world!</p>
                    {Contracts?.length > 0 ? Contracts.map((contract, indx) => (
                        <div className='Card mb-3 bg-light border col-lg-6 col-md-12 p-4 manualShadow rounded-4' key={indx}>
                            <div className="d-flex align-items-center main-color">
                                <FaFileContract />
                                <h4 className='ms-2 Card-title'>Contract Details:</h4>
                            </div>
                            <div className="card-body">
           
           
            <p>Timeframe: {contract.timeframe}</p>
            <p>Budget: ${contract.budget}</p>
            <p>Cover Letter: {contract.coverLetter}</p>
            <p>Work Plan: {contract.workPlan}</p>
            <p>Milestones: {contract.milestones}</p>
            <p>Availability: {contract.availability}</p>
            {Role==='Client'&&contract.status===0?<div>
            <button className='btn main-btn me-2'>Pay for the service</button>
            <button className='btn btn-dark me-2'>Cancel the contract</button>

            </div>:''}
        </div>
                        </div>
                    )) : <p>No Contracts</p>}
                </div>
            </div>
        </>
    );
    
}
