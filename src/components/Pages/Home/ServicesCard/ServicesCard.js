import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesCard.css';

const ServicesCard = ({ item }) => {
    // console.log(item);
    const { name, description, imageURL, price } = item;
    return (
        <section className='service-card-container'>
            <Link to='/services' style={{ textDecoration: 'none', color: 'black' }}>
                <div className='service-card p-2 shadow-lg  bg-body rounded'>
                    <img src={imageURL} className='img-fluid service-icon py-3' alt="" />
                    <h6 className='fs-4 fw-bold font-monospace'>{name}</h6>
                    <h5 className='fw-bold font-monospace'> Price = $ {price} </h5>
                    <p className='text-muted fw-lighter fw-bold font-monospace '>{description}</p>
                </div>
            </Link>
        </section>
    );
};

export default ServicesCard;