import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ProfileSteps.css';
import { Link } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdCreate } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';

const ProfileStep1 = ({ formData, handleChange, nextStep }) => {



    return (
        <div className="ProfileStepMain " id="ProfileStepMain">
            <div className="w-100 d-flex justify-content-center align-items-center my-5">
                <div className="box-div bg-white d-flex align-items-center py-5 rounded-5 justify-content-center">

                    <div className="container row">

                        <h3 className='py-5 fw-normal' >1/5</h3>

                        <div className='col-md-7  d-flex flex-column gap-4'>
                            <h2 ><span className='p-2'><FaCircle size={10} /></span> Create your profile  <MdAccountCircle size={45} className='pb-2' /></h2>
                            <h4 className='ps-4 lead'>Add your professional Job title</h4>
                            <div className="form-group ps-4 ">
                                <input name="Title" style={{ backgroundColor: '#E0E0E0' }} value={formData.Title}
                                    onChange={handleChange} className="form-control p-3 rounded-3" placeholder="Professional role" />
                            </div>


                            <label htmlFor="experienceLevel" className='ps-4 lead'>Experience Level</label>
                            <div className='form-group ps-4'>
                                <select as="select" name="experienceLevel" className="form-control p-3 rounded-3" style={{ backgroundColor: '#E0E0E0', color: '#999' }}onChange={handleChange} value={formData.experienceLevel}>
                                    <option value="" >Select your experience level</option>
                                    <option value="Beginner" style={{ color: 'black' }} className='WhiteBackground' >Beginner</option>
                                    <option value="Intermediate" style={{ color: 'black' }} className='WhiteBackground'>Intermediate</option>
                                    <option value="Advanced" style={{ color: 'black' }} className='WhiteBackground'>Advanced</option>
                                </select>
                            </div>

                            <h4 className='ps-4 lead'>Add your Education</h4>
                            <div className="form-group ps-4 ">
                                <input name="Education" style={{ backgroundColor: '#E0E0E0' }} value={formData.Education}
                                    onChange={handleChange} className="form-control p-3 rounded-3" placeholder="University/Major" />
                            </div>

                            <h4 className='ps-4 lead'>Add your work experience</h4>
                            <div className="form-group ps-4 ">
                                <textarea name="WorkExperience" style={{ backgroundColor: '#E0E0E0' }} value={formData.WorkExperience}
                                    onChange={handleChange} className="form-control p-3 rounded-3" placeholder="role1/company1, role2/company2 " />
                            </div>
                        </div>

                        <div className='col-md-4 offset-md-1 d-flex align-items-center'>
                            {/*will change pic */}
                            <img src={require('../../../Images/step4.png')} alt="logo" className='w-100 step4img rounded-3 h-75' />
                        </div>

                        <div className='d-flex justify-content-end mt-5'>
                            <div >
                                <Link ><button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5 " onClick={nextStep}><span>Next</span></button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStep1;
