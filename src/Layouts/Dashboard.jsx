import React from 'react';
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { MdBorderColor, MdMenu, MdOutlineRateReview } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {

    // TODO: get isAdmin value from the daatabase
    const [isAdmin] = useAdmin();
    const {user} = useAuth();


    return (
        <div className='flex'>
            {/* Dashboard sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu p-4'>
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminHome'> <FaHome></FaHome> Admin Home</NavLink></li>


                            <li><NavLink to='/dashboard/all-employee-list'> <FaUsers></FaUsers> All Users</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to='/dashboard/userHome'> <FaHome></FaHome> User Home</NavLink></li>

                                <li><NavLink to='/dashboard/review'> <MdOutlineRateReview /> Review</NavLink></li>

                                <li><NavLink to='/dashboard/paymentHistory'> <FaList></FaList> My Payment History</NavLink></li>
                            </>
                    }

                    {/* Shared NavLinks */}
                    <div className='divider'></div>

                    <li><NavLink to='/'> <FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/contactUs'> <FaEnvelope /> Contact Us</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 p-4'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;


