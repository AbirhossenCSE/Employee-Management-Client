import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        axiosPublic.post('/contact-us', data)
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Message sent successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    reset();
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to send the message.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'An error occurred. Please try again later.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <section className="min-h-screen bg-base-100 py-16 px-6">
            <Helmet>
                <title>SmartEmployee | Contact Us</title>
            </Helmet>

            <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-base-100 shadow-lg rounded-lg overflow-hidden">
                {/* Contact Information */}
                <div className="  p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-lg mb-6">
                        Have questions? Reach out to us and we'll get back to you as soon as possible.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-2xl" />
                            <p>1234 Mirpur, Dhaka, Bangladesh</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-2xl" />
                            <p>(123) 456-7890</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-2xl" />
                            <p>info@smartemployee.com</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-8">
                    <h2 className="text-3xl font-semibold text-orange-400 text-center mb-6">Contact Us</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium text-gray-500 mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: 'Name is required' })}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 p-3"
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-500 mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 p-3"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-500 mb-2" htmlFor="message">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                {...register('message', { required: 'Message is required' })}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 p-3"
                                placeholder="Enter your message"
                                rows="5"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
