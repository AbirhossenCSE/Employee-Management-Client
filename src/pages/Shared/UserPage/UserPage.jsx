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
            <h1 className="text-4xl text-center font-bold mb-4">Welcome Back, <span className='text-red-500'>{user?.displayName || 'User'}!</span></h1>
            {userInfo ? (
                <div className='flex items-center gap-4 bg-base-50 p-6 py-4 shadow-lg'>
                    <div className='w-2/12'>
                        <img src={userInfo.photo} className='w-full space-y-2 mt-10 ' alt={userInfo.name} />
                    </div>
                    <div className="w-full p-6 py-4 space-y-2 mt-10 rounded-lg ">
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
                            <strong>Designation :</strong> {userInfo.designation
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
