import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ProfileSteps.css';
import { Link } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
const ProfileStep3 = ({ formData, handleChange, nextStep,prevStep }) => {



    return (
        <div className="ProfileStepMain " id="ProfileStepMain">
            <div className="w-100 d-flex justify-content-center align-items-center my-5">
                <div className="box-div bg-white d-flex align-items-center py-5 rounded-5 justify-content-center">

                    <div className="container row">
                        <h3 className='py-5 fw-normal' >3/5</h3>

                        <div className='col-md-7  d-flex flex-column gap-4'>
                            <h2 ><span className='p-2'><FaCircle size={10} /></span> Write a bio to tell the world
                                about yourself <AiFillEdit size={40} className='pb-1' /></h2>
                            <h4 className='ps-4 lead'>Condense your story! Let's create a brief bio that resonates, inviting others to share theirs.</h4>
                            <div className="form-group ps-4 ">
                                <textarea name="Bio" as="textarea" style={{ height: '200px', backgroundColor: '#E0E0E0' }} value={formData.Bio}
                                    onChange={handleChange}   className="form-control p-3 bio rounded-3" placeholder="Share a bit about yourself. E.g., your professional background, passions, and key achievements." />
                            </div>
                        </div>

                        <div className='col-md-4 offset-md-1 d-flex align-items-center'>
                            <img src={require('../../../Images/step4.png')} alt="step4img" className='w-100 step4img rounded-3' />
                        </div>

                        <div className='d-flex justify-content-between mt-5'>
                            <div >
                                <Link ><button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5" onClick={prevStep}><span>Back</span></button></Link>
                            </div>

                            <div >
                                <Link ><button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5"onClick={nextStep}><span>Next</span></button></Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileStep3;
