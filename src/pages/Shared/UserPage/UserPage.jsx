import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const UserPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosSecure.get(`/users/${user.email}`);
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user, axiosSecure]);

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome Back, {user?.displayName || 'User'}!</h1>
            {userInfo ? (
                <div>
                    <div>
                        <img src={userInfo.photo} alt={userInfo.name} />
                    </div>
                    <div className="bg-gray-50 p-6 py-4 space-y-2 mt-10 rounded-lg shadow-lg">
                        <p className="text-lg">
                            <strong>Name:</strong> {userInfo.name}
                        </p>
                        <p className="text-lg">
                            <strong>Email:</strong> {userInfo.email}
                        </p>
                        <p className="text-lg">
                            <strong>Your Role:</strong> {userInfo.role}
                        </p>
                        <p className="text-lg">
                            <strong>Your Role:</strong> {userInfo.designation
                            }
                        </p>
                        <p className="text-lg">
                            <strong>Status:</strong> {userInfo.status || 'Active'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <p className="text-xl">Loading your details...</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;
