import React from 'react';
import logo from '../../../assets/logo/logo.jpg'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="footer bg-base-300 text-white-content p-10">
                <aside className='ml-12'>
                    <img src={logo} className='w-16' alt="" />
                    <p className='text-xl font-bold'>
                        Smart Employee Ltd.
                        <br />
                        Providing reliable tech since 2024.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title text-xl font-bold">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="w-8 h-8 text-blue-500 hover:text-blue-700 transition" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="w-8 h-8 text-red-600 hover:text-red-800 transition" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="w-8 h-8 text-blue-600 hover:text-blue-800 transition" />
                        </a>
                    </div>

                </nav>
            </div>
            <div className="bg-base-300 footer-center p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Smart Employee Ltd</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;