import React, { Suspense, useEffect, useState } from 'react';
import Spinner from '../../Shared/Spinner/Spinner';
import ServicesCard from '../ServicesCard/ServicesCard';
import './Services.css';


const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://ancient-lowlands-84914.herokuapp.com/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
            })
    }, [])

    return (
        <section className='container py-2'>
            <Suspense fallback={<Spinner />}>
                <div className="service-container">

                    {
                        services.map(item => <ServicesCard key={item._id} item={item} ></ServicesCard>)
                    }

                </div>
            </Suspense>
        </section>
    );
};

export default Services;