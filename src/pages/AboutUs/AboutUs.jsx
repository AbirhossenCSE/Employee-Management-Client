import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import NavBar from '../Shared/Navbar/NavBar';
import { Helmet } from 'react-helmet';
import Footer from '../Shared/Footer/Footer';

const AboutUs = () => {
    const axiosPublic = useAxiosPublic();
    const [totalEmployees, setTotalEmployees] = useState(0);

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => setTotalEmployees(res.data.length))
            .catch(error => console.error('Error fetching employee data:', error));
    }, [axiosPublic]);

    return (
        <div className="bg-base-50 min-h-screen">
            <NavBar />
            <Helmet>
                <title>SmartEmployee | About Us</title>
            </Helmet>
            
            <div className="max-w-6xl mx-auto mt-10 px-6 py-16 text-center">
                <h2 className="text-5xl font-extrabold mb-4">About Us</h2>
                <p className="text-lg max-w-3xl mx-auto">
                    Welcome to <strong>SmartEmployee</strong>, your trusted platform for managing employee workflow, salaries, contracts, and updates. We streamline HR processes and boost workplace efficiency.
                </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-6 text-2xl mb-12">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                    <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition">
                    <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition">
                    <FaYoutube />
                </a>
            </div>

            {/* Company Info & Map Section */}
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6 mb-8">
                {/* Company Details */}
                <div className="bg-base-200 shadow-md p-8 rounded-lg text-left">
                    <h3 className="text-3xl font-bold mb-6">Company Details</h3>
                    <p className=" flex items-center gap-3 mb-4"><FaUsers className="text-orange-500" /> <strong>Company Name:</strong> SmartEmployee</p>
                    <p className=" flex items-center gap-3 mb-4"><FaMapMarkerAlt className="text-orange-500" /> <strong>Address:</strong> Mirpur-1, Dhaka, Bangladesh</p>
                    <p className="flex items-center gap-3"><FaUsers className="text-orange-500" /> <strong>Total Employees:</strong> {totalEmployees}</p>
                </div>
                
                {/* Live Map */}
                <div className='bg-base-200 shadow-md p-8 rounded-lg'>
                    <h3 className="text-3xl font-bold mb-6">Find Us Here</h3>
                    <div className="rounded-lg overflow-hidden shadow-md h-64">
                        <iframe
                            title="Company Location"
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38791494157!2d90.2792398826355!3d23.822348398464947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c149bd0632b9%3A0xc1bf495b1f5b1c92!2sMirpur%201!5e0!3m2!1sen!2sbd!4v1700000000000"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AboutUs;
