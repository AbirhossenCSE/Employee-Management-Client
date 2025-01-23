import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

const AllEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosPublic.get('/users'); // Adjust the endpoint as per your backend API
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [axiosPublic]);

    return (
        <div className="p-6">
            <NavBar></NavBar>
            <Helmet>
                <title> SmartEmployee | All Employee</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6 mt-24">All Employee</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div
                        key={user._id}
                        className="card bg-white shadow-md rounded-lg p-4 hover:shadow-lg"
                    >
                        <img
                            src={user.photo || 'https://via.placeholder.com/150'}
                            alt={`${user.name}'s photo`}
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <div className="text-center mt-4">
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <p className="text-gray-600">{user.designation}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">
                                Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </p>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-700">
                                <span className="font-bold">Salary:</span> ${user.salary}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Bank Account:</span> {user.bank_account_no}
                            </p>
                            <p className="text-gray-700">
                                <span className={`font-bold ${user.verified ? 'text-green-500' : 'text-red-500'}`}>
                                    {user.verified ? 'Verified' : 'Not Verified'}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllEmployee;
