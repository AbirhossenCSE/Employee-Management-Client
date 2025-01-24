import React from 'react';
import logo from '../../../assets/logo/logo.jpg'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="footer bg-green-500 text-neutral-content p-10">
                <aside>
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
                        <a>
                            <FaTwitter className='w-8 h-8'></FaTwitter>
                        </a>
                        <a>
                            <FaYoutube className='w-8 h-8'></FaYoutube>
                        </a>
                        <a>
                            <FaFacebook className='w-8 h-8'></FaFacebook>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="bg-green-500 footer-center text-neutral-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Smart Employee Ltd</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;