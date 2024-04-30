import React, { useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function GetReviews() {
    const [reviews, setReviews] = useState([]);
    const { targetUserId } = useParams();

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await axios.get(`https://localhost:7157/api/Assessments/GetReviewsForUser?userid=${targetUserId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchReviews();
    }, []);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FaStar key={i} size={40} />);
        }
        return stars;
    };

    return (
        <div className="container-fluid">
            <h2 className="text-center my-5"><BiCommentDetail size={40} className='me-3' />What Do Customers Think? </h2>
            <div className='row d-flex gap-5 justify-content-center'>
                {reviews.map((review) => (
                    <div key={review.id} className='card shadow col-md-3 p-4 text-center align-items-center rounded-5'>
                        <div className="imgdiv w-50 text-center mb-3">
                            <img src={require('../../Images/unknown.webp')} className="rounded-circle img-fluid unknown" alt="Profile" />
                        </div>
                        <h3 className='fw-bold'>{review.reviewerName}</h3>
                        <div className='stars my-4 default-yellow'>
                            {renderStars(review.rating)}
                        </div>
                        <p className='lead w-100'>{review.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetReviews;
