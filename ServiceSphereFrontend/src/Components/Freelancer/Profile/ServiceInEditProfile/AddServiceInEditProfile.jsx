import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import $ from "jquery";
import { useFormik } from 'formik';

const AddServiceInEditProfile = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("https://localhost:7157/api/Services/Category");
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            Name: '',
            Price: '',
            Description: '',
            CategoryId: '',
        },
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem('user');
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                await axios.post('https://localhost:7157/api/Services/AddService', values, { headers });
                alert('Service added successfully');
                {/*navigate('/ProfileStep5');*/}
            } catch (error) {
                console.error('Failed to add service', error);
                alert('Failed to add service');
            }
        },
        validate: (values) => {
            const errors = {};
            if (!values.Name) {
                errors.Name = 'Required';
            }
            if (!values.Price) {
                errors.Price = 'Required';
            } else if (values.Price <= 0) {
                errors.Price = 'Price must be greater than 0';
            }
            if (!values.CategoryId) {
                errors.CategoryId = 'Required';
            }
            return errors;
        },
    });

    return (
        <div className="ProfileStepMain" id="ProfileStepMain">
            <div className="w-100 d-flex justify-content-center align-items-center my-5 py-5 ">
                <div className="bg-white box-div d-flex align-items-center py-5 rounded-5 justify-content-center">

                    <div className="container row d-flex align-items-center justify-content-center">
                        

                        <form onSubmit={formik.handleSubmit} className='col-md-9 d-flex flex-column gap-2'>
                            <h2 className='mb-5'><span className='p-2'><FaCircle size={10} /></span>What are the main services you offer? <MdOutlineMiscellaneousServices size={60} className='pb-1' /></h2>

                            <h4 className='ps-4 lead'>Select the service category</h4>
                            <div className="form-group ps-4 ">
                                <select name="CategoryId" className="form-control p-3 rounded-3" style={{ color: '#999' }}
                                    onChange={formik.handleChange}
                                    value={formik.values.CategoryId}>
                                    <option value="">Select your service category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id} style={{ color: 'black', backgroundColor: 'White' }}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Add Your Service input field */}
                            <h4 className='ps-4 lead'>Add Your Service</h4>
                            <div className="form-group ps-4 ">
                                <input name="Name"  className="form-control p-3 bio rounded-3" placeholder="Enter a Service you offer"
                                    onChange={formik.handleChange}
                                    value={formik.values.Name} />
                            </div>

                            {/* Add its price input field */}
                            <h4 className='ps-4 lead'>Add it's price</h4>
                            <div className="form-group ps-4 ">
                                <input name="Price"  className="form-control p-3 rounded-3  " placeholder="Enter service price offered"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.Price} />
                            </div>

                            {/* Description input field */}
                            <h4 className='ps-4 lead'>Description</h4>
                            <div className="form-group ps-4 ">
                                <textarea name="Description" as="textarea" style={{ height: '150px' }} className="form-control p-3 bio rounded-3" placeholder="Describe your service in more details"
                                onChange={formik.handleChange}
                                value={formik.values.Description}></textarea>
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="learn-more-btn mt-4 w-50">Add Service</button>
                            </div>

                            <div className='d-flex justify-content-end mt-5'>
                            <div >
                                <Link to="/edit-profile"><button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5"><span>Save Changes</span></button></Link>
                            </div>

                           
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddServiceInEditProfile;

