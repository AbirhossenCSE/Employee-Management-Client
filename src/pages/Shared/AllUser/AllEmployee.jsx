import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

const AllEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosPublic.get('/users');
                setUsers(res.data);
                setFilteredUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [axiosPublic]);

    // Handle search by employee name
    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    // Handle sorting by salary
    const handleSort = () => {
        const sortedUsers = [...filteredUsers].sort((a, b) =>
            sortOrder === 'asc' ? a.salary - b.salary : b.salary - a.salary
        );
        setFilteredUsers(sortedUsers);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="min-h-screen bg-base-100">
            <NavBar />
            <Helmet>
                <title> SmartEmployee | All Employees</title>
            </Helmet>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-4xl font-extrabold text-center text-gray-500 my-10">
                    Meet Our <span className="text-orange-400">Employees</span>
                </h2>

                {/* Search & Sort Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center lg:ml-16 mb-6 space-y-4 sm:space-y-0">
                    <input
                        type="text"
                        placeholder="Search employee by name..."
                        className="px-4 py-2 w-full sm:w-1/3 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSort}
                        className="px-4 py-2 lg:mr-16 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition "
                    >
                        Sort by Salary {sortOrder === 'asc' ? '⬆' : '⬇'}
                    </button>
                </div>

                {/* Show Loader while data is loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <div
                                    key={user._id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    <div className="bg-gradient-to-r from-orange-200 to-orange-400 h-32 flex justify-center items-center">
                                        <img
                                            src={user.photo || 'https://via.placeholder.com/150'}
                                            alt={`${user.name}'s photo`}
                                            className="w-24 h-24 border-4 border-white rounded-full shadow-lg"
                                        />
                                    </div>
                                    <div className="p-6 text-">
                                        <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                                        <p className="text-gray-700 font-medium">{user.designation}</p>
                                        <p className="text-gray-500 text-sm">Email: {user.email}</p>
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
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-lg">No employees found.</p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default AllEmployee;
