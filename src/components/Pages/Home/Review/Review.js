import React, { Suspense, useEffect, useState } from 'react';
import Spinner from '../../Shared/Spinner/Spinner';
import ReviewCard from '../ReviewCard/ReviewCard';
import './Review.css';


const Review = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('https://ancient-lowlands-84914.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, []);
    return (
        <section className='review-container'>
            <h1 className='text-center py-5'>Happy <span>Customers</span>, Happy Homes</h1>
            <Suspense fallback={<Spinner />}>
                <div className="review-card-container pb-5">
                    {
                        review.map(single => <ReviewCard key={single._id} single={single} ></ReviewCard>)
                    }
                </div>
            </Suspense>
        </section>
    );
};

export default Review;