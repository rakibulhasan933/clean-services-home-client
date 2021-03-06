import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const publishableKey = 'pk_test_51IhuABD4bG2KrznN6G9qymWo9qM6yo8CzOm8evK9ubKWvT2PG4z1jw37xbdA7vyIguPd9GYeSzJfhcVuIPwtKIoj00eW9mNYDw';


const Payment = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    useEffect(() => {
        fetch(`https://ancient-lowlands-84914.herokuapp.com/oder/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [id]);
    const handleSuccess = () => {
        MySwal.fire({
            icon: 'success',
            title: 'Payment was successful',
            time: 4000,
        });
    };
    const handleFailure = () => {
        MySwal.fire({
            icon: 'error',
            title: 'Payment was not successful',
            time: 4000,
        });
    };
    const priceForStripe = service.price * 100;

    const payNow = async token => {
        try {
            const response = await axios({
                url: 'https://ancient-lowlands-84914.herokuapp.com/payment',
                method: 'post',
                data: {
                    amount: service.price * 100,
                    token,
                },
            });
            if (response.status === 200) {
                const url = `https://ancient-lowlands-84914.herokuapp.com/oder/${id}`
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                handleSuccess();
            }
        } catch (error) {
            handleFailure();
            console.log(error);
        }
    };

    return (
        <div className='py-2'>
            <div className="pb-2">
                <h3 className='fw-bold font-monospace'>Your ordered service Payment system</h3>
                <hr />
                <div className="container">
                    <h2 className='fw-bold font-monospace'>Please Pay For {service.name} for {service.productName} </h2>
                    <h4 className='fw-bold font-monospace'>Pay $ {service.price} </h4>
                </div>
                <div className="py-1">
                    {service.payment ? <h4 className='fw-bold font-monospace'>Payment completed </h4> : <StripeCheckout
                        stripeKey={publishableKey}
                        label="Pay Now"
                        name="Pay With Credit Card"
                        billingAddress
                        shippingAddress
                        amount={priceForStripe}
                        description={`Your total is $${service.price}`}
                        token={payNow}
                    />}
                </div>
            </div>
        </div>
    );
};

export default Payment;