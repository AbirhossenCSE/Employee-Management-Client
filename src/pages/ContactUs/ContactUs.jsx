import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';

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
                    reset(); // Reset the form after successful submission
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
        <section className="max-w-4xl mx-auto p-12 px-6 bg-gray-50 rounded-md shadow-md">
            {/* Company Address */}
            <Helmet>
                <title> SmartEmployee | Contact Us</title>
            </Helmet>
            <div className="mb-8 my-10">
                <h2 className="text-4xl font-semibold text-blue-600 mb-4 text-center">Contact Us</h2>
                <p className="text-center text-gray-700 mb-4">
                    Our office is located at: Dhaka
                </p>
                <address className="text-center text-gray-600 mb-6">
                    <strong>Smart Employee Company</strong>
                    <br />
                    1234 Mirpur, Dhaka
                    <br />
                    Dhaka, 1200
                    <br />
                    Phone: (123) 456-7890
                    <br />
                    Email: info@smartemployee.com
                </address>
                <hr className="border-gray-300" />
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Email is required' })}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="message">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        {...register('message', { required: 'Message is required' })}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your message"
                        rows="5"
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default ContactUs;
