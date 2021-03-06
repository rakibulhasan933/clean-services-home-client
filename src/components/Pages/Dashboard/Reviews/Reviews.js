import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const Reviews = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useAuth() || {};

    const { displayName, photoURL } = user;

    const onSubmit = (data) => {
        const serviceData = {
            name: displayName,
            comments: data.comments,
            position: data.position,
            imageURL: photoURL
        }
        // console.log(serviceData);
        axios.post('https://ancient-lowlands-84914.herokuapp.com/reviews', serviceData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Thank you so much for giving us feedback',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    reset();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Container>

            <h4 className="font-monospace fw-bold pt-5">Write Down Your Review</h4>

            <hr className="w-100 mb-5 mx-auto" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    className="input-field w-75 mb-3 font-monospace fw-bold shadow-lg  bg-body rounded"
                    name="comments"
                    placeholder="Comments"
                    {...register("comments", { required: true })}
                />
                <br />
                <input
                    {...register("position", { required: true })}
                    placeholder="Position"
                    type="text"
                    className=" font-monospace fw-bold p-2 m-2 w-50 input-field shadow-lg  bg-body rounded"
                />
                <br />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />
                <input
                    className="submit-btn btn btn-info mt-4 mb-3 font-monospace fw-bold shadow-lg  rounded"
                    type="submit"
                    value="Review"
                />
            </form>
        </Container>
    );
};

export default Reviews;