import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const UserPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosSecure.get(`/users/${user.email}`);
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user, axiosSecure]);

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl text-center font-bold mb-6">
                Welcome Back, <span className="text-indigo-500">{user?.displayName || 'User'}!</span>
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : userInfo ? (
                <div className="flex flex-col md:flex-row items-center gap-6 bg-base-100 p-4 sm:p-6 rounded-lg shadow-md">
                    <div className="w-32 h-32 shrink-0">
                        <img
                            src={userInfo.photo}
                            className="w-full h-full object-cover rounded-full border-4 border-gray-600"
                            alt={userInfo.name}
                        />
                    </div>
                    <div className="flex-1 space-y-2 text-sm sm:text-base md:text-lg">
                        <p><strong>Name:</strong> {userInfo.name}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Your Role:</strong> {userInfo.role}</p>
                        <p><strong>Designation:</strong> {userInfo.designation}</p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={`font-semibold ${userInfo.status === 'Inactive' ? 'text-red-500' : 'text-green-600'}`}>
                                {userInfo.status || 'Active'}
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <p className="text-xl text-gray-500">No user data found.</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;
