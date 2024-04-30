import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SuccessMessage = () => (
    <div className="alert alert-success text-center mb-5 " role="alert">
        Review posted successfully!
    </div>
);

const Reviews = () => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const { targetUserId } = useParams();
    const [reviewPosted, setReviewPosted] = useState(false);

    const handleClick = (index) => {
        setRating(index);
    };

    const handleReviewChange = (event) => {
        setDescription(event.target.value);
    };

    const PostReview = async () => {
        try {
            const token = localStorage.getItem('user');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            await axios.post(
                `https://localhost:7157/api/Assessments/PostReview?targetUserId=${targetUserId}`,
                { rating: rating, description: description },
                { headers: headers }
            );
            setReviewPosted(true);
            setTimeout(() => {
                setReviewPosted(false);
            }, 3000); // Hide the message after 3 seconds
        } catch (error) {
            console.error('Failed to post review', error);
            alert('Failed to post review');
        }
    };

    return (

        <div className="w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
            {reviewPosted && <SuccessMessage />}
            <div className="reviews w-100 d-flex flex-column align-items-center justify-content-center" id="reviews">
                <div className="box-div bg-white d-flex align-items-center py-5 rounded-5 justify-content-center">
                    <div className="container row">
                        <div className='col-md-7 d-flex flex-column gap-4'>
                            <h2><span className='p-2'></span> Let Us Know What You Think <AiFillEdit size={40} className='pb-1 ms-2' /></h2>
                            <h4 className='ps-4 lead'>Please feel free to write an honest review!</h4>
                            <h4 className='ps-4 lead solidPurple'>Your Overall Rating 1/5</h4>
                            <span className='ms-4'>
                                <div className='stars-container'>
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <FaStar
                                            key={index}
                                            onClick={() => handleClick(index)}
                                            className={`star me-2 ${index <= rating ? 'dark-yellow' : 'default-yellow'}`}
                                        />
                                    ))}
                                </div>
                            </span>
                            <h4 className='ps-4 lead solidPurple'>Your review</h4>
                            <div className="form-group ps-4">
                                <textarea
                                    name="desc"
                                    as="textarea"
                                    style={{ height: '200px', backgroundColor: '#E0E0E0' }}
                                    className="form-control p-3 bio rounded-3"
                                    placeholder="Tell people your review ..."
                                    value={description}
                                    onChange={handleReviewChange}
                                />
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mt-3'>
                            <div>
                                <Link><button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5" onClick={PostReview}><span>Post Review</span></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
