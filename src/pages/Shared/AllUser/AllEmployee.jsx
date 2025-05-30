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

    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleSort = () => {
        const sorted = [...filteredUsers].sort((a, b) =>
            sortOrder === 'asc' ? a.salary - b.salary : b.salary - a.salary
        );
        setFilteredUsers(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300 mt-20">
            <NavBar />
            <Helmet>
                <title>SmartEmployee | All Employees</title>
            </Helmet>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-2 py-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
                    Meet Our <span className="">Employees</span>
                </h2>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search by employee name..."
                        className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-400 bg-base-200 text-base-content focus:ring-2 focus:ring-gray-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSort}
                        className="btn btn-neutral text-white px-6 py-2 rounded-lg font-medium"
                    >
                        Salary: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
                    </button>
                </div>

                {/* Loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-14 h-14 border-4 border-dashed border-indigo-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <div
                                    key={user._id}
                                    className="bg-base-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="bg-gradient-to-r from-gray-500 to-gray-700 h-32 flex justify-center items-center">
                                        <img
                                            src={user.photo || 'https://via.placeholder.com/150'}
                                            alt={user.name}
                                            className="w-full h-full   shadow-md object-cover"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-indigo-500">{user.name}</h3>
                                        <p className="text-sm">{user.designation}</p>
                                        <p className="text-sm mt-1">
                                            Email: <span className="break-words">{user.email}</span>
                                        </p>
                                        <p className="mt-2 text-sm text-base-content">
                                            <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </p>
                                    </div>

                                    <div className="bg-base-300 px-5 py-4 text-sm text-base-content border-t border-base-100">
                                        <p>
                                            <strong>Salary:</strong> ${user.salary}
                                        </p>
                                        <p className="mt-1">
                                            <strong>Bank Account:</strong> {user.bank_account_no}
                                        </p>
                                        <p className={`mt-2 font-semibold ${user.verified ? 'text-green-500' : 'text-red-500'}`}>
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
