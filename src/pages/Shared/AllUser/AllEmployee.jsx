import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

const AllEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosPublic.get('/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [axiosPublic]);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <Helmet>
                <title> SmartEmployee | All Employee</title>
            </Helmet>

            <div className="max-w-8xl mx-auto px-6 py-12">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 my-10">
                    Meet Our <span className="text-green-400">Employees</span>
                </h2>

                {/* Show Loader while data is loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {users.map(user => (
                            <div
                                key={user._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="bg-gradient-to-r from-gray-300 to-gray-500 h-32 flex justify-center items-center">
                                    <img
                                        src={user.photo || 'https://via.placeholder.com/150'}
                                        alt={`${user.name}'s photo`}
                                        className="w-24 h-24 border-4 border-white rounded-full shadow-lg"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                                    <p className="text-green-600 font-medium">{user.designation}</p>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                    <p className="text-gray-600 mt-2 font-semibold">
                                        Role: <span className="text-gray-700">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                    </p>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 text-center">
                                    <p className="text-gray-700 font-semibold">
                                        <span className="font-bold text-gray-800">Salary:</span> ${user.salary}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-bold text-gray-800">Bank Account:</span> {user.bank_account_no}
                                    </p>
                                    <p className={`mt-2 font-bold ${user.verified ? 'text-green-600' : 'text-red-500'}`}>
                                        {user.verified ? '✔ Verified' : '✖ Not Verified'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default AllEmployee;
